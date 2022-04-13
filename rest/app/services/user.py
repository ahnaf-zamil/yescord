from datetime import timedelta
from typing import Optional
from fastapi import HTTPException, Request
from .base import DatabaseAware
from app.models import User
from app.core.security import (
    create_access_token,
    get_password_hash,
    verifiy_access_token,
    verify_password,
)
from app.utils import get_snowflake

import random


class UserService(DatabaseAware):
    def _check_username_conflict(self, username: str, discriminator: int) -> bool:
        """Checks if a record with the SAME username and discriminator combination exists or not"""
        user_exists = (
            self.db.query(User.id)
            .filter_by(username=username, discriminator=discriminator)
            .first()
            is not None
        )

        return user_exists

    def check_auth(self, request: Request):
        """Authentication checker"""
        cookie = request.cookies.get("authorization")
        claims = verifiy_access_token(cookie)

        if not claims:
            raise HTTPException(401, detail="Unauthorized")

        user: Optional[User] = (
            self.db.query(User).filter_by(id=int(claims["sub"])).first()
        )
        if not user:
            raise HTTPException(status_code=401, detail="Unauthorized")

        return user

    def register_user(self, username: str, email: str, password: str) -> User:
        """Creates a new user in the application"""
        user_exists = self.db.query(User.id).filter_by(email=email).first() is not None

        if user_exists:
            raise HTTPException(status_code=409, detail="User already exists")

        hashed_password = get_password_hash(password)

        conflict_exists = True
        while conflict_exists:
            discriminator = random.randint(1000, 9999)
            # Checking if user with same username and discriminator pair exists or not
            # If it does, generate another discriminator
            conflict_exists = self._check_username_conflict(username, discriminator)

        new_user = User(
            id=get_snowflake(),
            username=username,
            email=email,
            discriminator=discriminator,
            hashed_password=hashed_password,
        )
        self.db.add(new_user)
        self.db.commit()

        return new_user

    def login_user(self, email: str, password: str) -> str:
        """Authenticates and logs in a user"""
        user: Optional[User] = self.db.query(User).filter_by(email=email).first()

        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        if not verify_password(password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        # Creating JWT access token valid for 7 days
        access_token = create_access_token(str(user.id), timedelta(days=7))

        # Returning token so that controller can set cookie
        return access_token
