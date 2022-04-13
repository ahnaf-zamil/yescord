from sqlalchemy.ext.declarative import as_declarative, declared_attr


@as_declarative()
class DeclarativeBase:
    id: int
    __name__: str

    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()
