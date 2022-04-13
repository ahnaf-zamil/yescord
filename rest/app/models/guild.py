from sqlalchemy import Column, Integer, String, BigInteger, ForeignKey
from sqlalchemy.orm import relationship
from .base import DeclarativeBase

import time


class Guild(DeclarativeBase):
    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(32), nullable=False)
    owner_id = Column(BigInteger, nullable=False)

    members = relationship("User", secondary="guild_joins", back_populates="guilds")
    invites = relationship("GuildInvite")

    def to_json(self):
        payload = {
            "id": str(self.id),
            "name": self.name,
            "owner_id": str(self.owner_id),
        }
        return payload


class GuildJoin(DeclarativeBase):
    __tablename__ = "guild_joins"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(BigInteger, ForeignKey("user.id"))
    guild_id = Column(BigInteger, ForeignKey("guild.id"))
    joined_at = Column(
        BigInteger, default=time.time
    )  # Current UNIX epoch will be the joined_at time
