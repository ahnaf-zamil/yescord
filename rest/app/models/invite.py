from sqlalchemy import Column, Integer, String, BigInteger, ForeignKey
from app.utils import get_snowflake
from .base import DeclarativeBase


class GuildInvite(DeclarativeBase):
    __tablename__ = "invites"

    id = Column(Integer, primary_key=True)
    code = Column(String(10), nullable=False, unique=True)
    expires_at = Column(
        BigInteger, default=0, nullable=False
    )  # If it's 0, it's a never-expiring invite
    uses = Column(String(20), default=0, nullable=False)
    guild_id = Column(String(20), ForeignKey("guild.id"))
