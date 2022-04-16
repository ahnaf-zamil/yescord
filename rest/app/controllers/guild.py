from fastapi import APIRouter, Depends, Request
from app.services.user import UserService
from app.services.guild import GuildService
from app.schemas.guild import CreateGuild, CreateGuildInvite, JoinGuild, CreateChannel

router = APIRouter()


@router.post("/{guild_id}/channels")
def create_channel(
    guild_id: int,
    body: CreateChannel,
    request: Request,
    user_service: UserService = Depends(),
    guild_service: GuildService = Depends(),
):
    user = user_service.check_auth(request)
    channel = guild_service.create_channel(user.id, str(guild_id), body.name, body.type)
    return channel.to_json()


@router.post("/create", status_code=201)
def create_guild(
    body: CreateGuild,
    request: Request,
    user_service: UserService = Depends(),
    guild_service: GuildService = Depends(),
):
    user = user_service.check_auth(request)
    guild = guild_service.create_guild(user.id, body.name)
    return guild.to_json()


@router.post("/join")
def join_guild(
    body: JoinGuild,
    request: Request,
    user_service: UserService = Depends(),
    guild_service: GuildService = Depends(),
):
    user = user_service.check_auth(request)
    guild_id = guild_service.join_guild(user.id, body.code)
    return {"success": True, "guild_id": guild_id}


@router.post("/{guild_id}/invites", status_code=201)
def create_guild_invite(
    guild_id: int,
    body: CreateGuildInvite,
    request: Request,
    user_service: UserService = Depends(),
    guild_service: GuildService = Depends(),
):
    user = user_service.check_auth(request)
    invite = guild_service.create_invite(user.id, guild_id, body.expires_at)
    return {"code": invite.code}
