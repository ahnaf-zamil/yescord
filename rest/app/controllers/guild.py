from fastapi import APIRouter, Depends, Request
from app.services.user import UserService
from app.services.guild import GuildService
from app.schemas.guild import CreateGuild, CreateGuildInvite, JoinGuild

router = APIRouter()


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
    return {"success": True, "guild_id": str(guild_id)}


@router.post("/invites/create", status_code=201)
def create_guild_invite(
    body: CreateGuildInvite,
    request: Request,
    user_service: UserService = Depends(),
    guild_service: GuildService = Depends(),
):
    user = user_service.check_auth(request)
    invite = guild_service.create_invite(user.id, int(body.guild_id), body.expires_at)
    return {"code": invite.code}
