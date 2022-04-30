from sqlalchemy import Boolean, Column, Integer, String, BigInteger
from sqlalchemy.orm import relationship
from app.utils import get_snowflake
from .base import DeclarativeBase

import time


class User(DeclarativeBase):
    id = Column(String(20), primary_key=True, index=True, default=get_snowflake)
    username = Column(String(32), nullable=False)
    discriminator = Column(Integer, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(60), nullable=False)
    created_at = Column(BigInteger, default=time.time)

    is_active = Column(Boolean(), default=True)
    is_staff = Column(Boolean(), default=False)

    guilds = relationship("Guild", secondary="guild_joins", back_populates="members")
    messages = relationship("Message")

    def to_json(self, email=False):
        payload = {
            "id": self.id,
            "username": self.username,
            "discriminator": self.discriminator,
            "admin": self.is_staff,
            "created_at": str(self.created_at),
        }

        if email:
            payload["email"] = self.email

        return payload
