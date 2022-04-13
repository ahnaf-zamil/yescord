from sqlalchemy import Column, String, BigInteger, ForeignKey
from .base import DeclarativeBase


class GuildInvite(DeclarativeBase):
    __tablename__ = "invites"

    id = Column(BigInteger, primary_key=True)
    code = Column(String(10), nullable=False, unique=True)
    expires_at = Column(
        BigInteger, default=0, nullable=False
    )  # If it's 0, it's a never-expiring invite
    uses = Column(BigInteger, default=0, nullable=False)
    guild_id = Column(BigInteger, ForeignKey("guild.id"))
