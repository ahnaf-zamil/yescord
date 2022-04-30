from pydantic import BaseModel, constr


class SendMessage(BaseModel):
    content: constr(max_length=1000)
