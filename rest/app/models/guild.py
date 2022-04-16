from sqlalchemy import Column, Integer, String, BigInteger, ForeignKey
from sqlalchemy.orm import relationship
from app.utils import get_snowflake
from .base import DeclarativeBase

import time


class Guild(DeclarativeBase):
    id = Column(String(20), primary_key=True, index=True, default=get_snowflake)
    name = Column(String(32), nullable=False)
    owner_id = Column(String(20), nullable=False)
    created_at = Column(BigInteger, default=time.time)

    channels = relationship("Channel")
    members = relationship("User", secondary="guild_joins", back_populates="guilds")
    invites = relationship("GuildInvite")

    def to_json(self):
        payload = {
            "id": self.id,
            "name": self.name,
            "owner_id": self.owner_id,
            "created_at": str(self.created_at),
        }
        return payload


class GuildJoin(DeclarativeBase):
    __tablename__ = "guild_joins"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String(20), ForeignKey("user.id"))
    guild_id = Column(String(20), ForeignKey("guild.id"))
    joined_at = Column(
        BigInteger, default=time.time
    )  # Current UNIX epoch will be the joined_at time
