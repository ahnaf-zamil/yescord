from fastapi import APIRouter

from .routers import user

controller = APIRouter()

controller.include_router(user.router, prefix="/users")
