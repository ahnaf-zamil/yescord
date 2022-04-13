import random
from fastapi import HTTPException
from .base import DatabaseAware
from app.models import User
from app.core.security import get_password_hash
from app.utils import get_snowflake


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
