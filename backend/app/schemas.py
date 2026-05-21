from pydantic import BaseModel
from typing import List, Optional

class MemberCreate(BaseModel):
    name: str
    email: str
    image_base64: str   # from webcam

class TeamCreate(BaseModel):
    team_name: str
    idea_title: str
    members: List[MemberCreate]

class CheckinRequest(BaseModel):
    image_base64: str

class CheckinResponse(BaseModel):
    success: bool
    message: str
    name: Optional[str] = None
    team: Optional[str] = None
    idea: Optional[str] = None