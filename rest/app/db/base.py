# Import all the models, so that Base has them before being
# imported by Alembic
from app.models.base import BaseModel  # noqa
from app.models.user import User  # noqa
