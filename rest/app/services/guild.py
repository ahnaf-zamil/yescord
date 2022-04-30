from typing import Optional
from fastapi import HTTPException
from app.types.channel import ChannelTypes
from app.utils import get_snowflake
from .base import DatabaseAware
from app.models import Guild, GuildJoin, GuildInvite, Channel

from sqlalchemy import func

import random
import string
import time


class GuildService(DatabaseAware):
    def check_member_join(self, user_id: int, guild_id: int) -> bool:
        """Checks if a user is member of a guild or not"""
        return (
            self.db.query(GuildJoin.id)
            .filter_by(user_id=user_id, guild_id=guild_id)
            .first()
            is not None
        )

    def create_guild(self, user_id: int, name: str) -> Guild:
        """Creates a 'guild' in the application"""
        # Hardcoded guild limit for someone is 100 at the moment
        user_guild_count: int = (
            self.db.query(func.count(GuildJoin.id))
            .filter_by(user_id=user_id)
            .first()[0]
        )
        if user_guild_count > 99:
            raise HTTPException(
                status_code=403,
                detail="Maximum number of guilds reached, cannot create or join more",
            )

        guild = Guild(id=get_snowflake(), name=name, owner_id=user_id)
        guild_join = GuildJoin(user_id=user_id, guild_id=guild.id)

        self.db.add(guild)
        self.db.add(guild_join)
        self.db.commit()

        return guild

    def join_guild(self, user_id: int, inv_code: str) -> int:
        """Joins the user into a guild by it's invite code"""
        invite: Optional[GuildInvite] = (
            self.db.query(GuildInvite).filter_by(code=inv_code).first()
        )

        if not invite:  # If no invite is found
            raise HTTPException(status_code=401, detail="Invalid invite code")
        if time.time() > invite.expires_at:  # If invite has expired
            raise HTTPException(status_code=401, detail="Invalid invite code")

        guild_join = (
            self.db.query(GuildJoin.id)
            .filter_by(user_id=user_id, guild_id=invite.guild_id)
            .first()
            is not None
        )
        if guild_join:
            raise HTTPException(
                status_code=403, detail="You are already a member of this guild"
            )

        # Assuming that the guild is valid and exists in DB, which will always happen
        guild_join = GuildJoin(user_id=user_id, guild_id=invite.guild_id)
        invite.uses += 1

        self.db.add(guild_join)
        self.db.commit()

        return invite.guild_id

    def create_invite(
        self, user_id: int, guild_id: int, expires_at: int
    ) -> GuildInvite:
        """Creates a guild invite for adding members"""
        guild_join = (
            self.db.query(GuildJoin.id)
            .filter_by(user_id=user_id, guild_id=guild_id)
            .first()
            is not None
        )

        if not guild_join:
            raise HTTPException(
                status_code=403, detail="You are not a member of this guild"
            )

        if not expires_at == 0:  # If it is 0, the invite is never-expiring
            current_time = time.time()
            if current_time > expires_at:
                # Checks if the expiry time is set to be before the current time
                raise HTTPException(
                    status_code=400, detail="Expiry time cannot be before current time"
                )

        code = "".join(
            random.SystemRandom().choice(string.ascii_letters) for _ in range(10)
        )
        new_invite = GuildInvite(code=code, guild_id=guild_id, expires_at=expires_at)

        self.db.add(new_invite)
        self.db.commit()

        return new_invite

    def create_channel(
        self, member_id: int, guild_id: int, channel_name: str, channel_type: int
    ):
        # Only for NOW, all members can create channels
        guild_join = (
            self.db.query(GuildJoin.id)
            .filter_by(user_id=member_id, guild_id=guild_id)
            .first()
            is not None
        )

        if not guild_join:
            raise HTTPException(
                status_code=403, detail="You are not a member of this guild"
            )

        if not channel_type in ChannelTypes:
            raise HTTPException(status_code=400, detail="Invalid channel type")

        new_channel = Channel(
            id=get_snowflake(), name=channel_name, guild_id=guild_id, type_=channel_type
        )
        self.db.add(new_channel)
        self.db.commit()

        return new_channel
