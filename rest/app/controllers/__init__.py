from fastapi import APIRouter

from . import user, guild, gateway

controller = APIRouter()

controller.include_router(user.router, prefix="/users")
controller.include_router(guild.router, prefix="/guilds")
controller.include_router(gateway.router, prefix="/gateway")
