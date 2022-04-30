from typing import Optional

from fastapi import HTTPException
from app.models import Message, Channel
from app.models import GuildJoin
from app.utils import get_snowflake
from .base import DatabaseAware


class MessageService(DatabaseAware):
    def send_message(
        self, user_id: int, channel: Optional[Channel], content: str
    ) -> Message:
        """Sends a message in a given channel"""
        if not channel:
            raise HTTPException(status_code=404, detail="Channel not found")

        guild_join = (
            self.db.query(GuildJoin.id)
            .filter_by(user_id=user_id, guild_id=channel.guild_id)
            .first()
            is not None
        )

        if not guild_join:
            raise HTTPException(
                status_code=403, detail="You are not a member of this guild"
            )

        new_msg = Message(
            id=get_snowflake(), content=content, channel_id=channel.id, user_id=user_id
        )
        self.db.add(new_msg)
        self.db.commit()

        # Todo: Dispatch a message create event so that other members are notified

        return new_msg
