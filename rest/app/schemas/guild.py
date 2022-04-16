from typing import Optional
from pydantic import BaseModel, constr


# Shared properties
class GuildBase(BaseModel):
    name: constr(min_length=3, max_length=32)


class CreateGuild(GuildBase):
    pass


class CreateGuildInvite(BaseModel):
    expires_at: Optional[int] = 0


class JoinGuild(BaseModel):
    code: constr(max_length=10)


class CreateChannel(BaseModel):
    name: constr(min_length=1, max_length=20)
    type: int
