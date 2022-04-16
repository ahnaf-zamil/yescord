import enum

from app.types.meta import TypeMeta


class ChannelTypes(enum.Enum, metaclass=TypeMeta):
    GUILD = 0
    DM = 1
