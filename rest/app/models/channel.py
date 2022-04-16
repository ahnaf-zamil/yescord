from sqlalchemy import Column, ForeignKey, Integer, String, BigInteger
from app.utils import get_snowflake
from .base import DeclarativeBase

import time


class Channel(DeclarativeBase):
    id = Column(String(20), primary_key=True, index=True, default=get_snowflake)
    name = Column(String(32), nullable=False)
    guild_id = Column(String(20), ForeignKey("guild.id"))
    type_ = Column(Integer, nullable=False, name="type")

    created_at = Column(BigInteger, default=time.time)

    def to_json(self):
        payload = {
            "id": self.id,
            "name": self.name,
            "type": self.type_,
            "guild_id": self.guild_id,
            "created_at": str(self.created_at),
        }
        return payload
