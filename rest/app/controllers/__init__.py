from fastapi import APIRouter

from . import user

controller = APIRouter()

controller.include_router(user.router, prefix="/users")
