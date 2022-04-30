from sqlalchemy import Column, ForeignKey, Integer, String, BigInteger, Text
from app.utils import get_snowflake
from .base import DeclarativeBase

import time


class Message(DeclarativeBase):
    id = Column(String(20), primary_key=True, index=True, default=get_snowflake)
    content = Column(Text(1000), nullable=False)
    channel_id = Column(String(20), ForeignKey("channel.id"))
    user_id = Column(String(20), ForeignKey("user.id"))

    created_at = Column(BigInteger, default=time.time)

    def to_json(self):
        payload = {
            "id": self.id,
            "content": self.content,
            "channel_id": self.channel_id,
            "created_at": str(self.created_at),
        }
        return payload
