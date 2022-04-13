from sqlalchemy import Boolean, Column, Integer, String, BigInteger
from .base import DeclarativeBase


class User(DeclarativeBase):
    id = Column(BigInteger, primary_key=True, index=True)
    username = Column(String(32), nullable=False)
    discriminator = Column(Integer, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(60), nullable=False)

    is_active = Column(Boolean(), default=True)
    is_staff = Column(Boolean(), default=False)

    def to_json(self, email=False):
        payload = {
            "id": self.id,
            "username": self.username,
            "discriminator": self.discriminator,
            "admin": self.is_staff,
        }

        if email:
            payload["email"] = self.email

        return payload