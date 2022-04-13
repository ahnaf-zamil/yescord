from fastapi import Depends
from app.core.dependencies import get_db


# Base class for all services to inherit
class DatabaseAware:
    def __init__(self, db=Depends(get_db)):
        self.db = db
