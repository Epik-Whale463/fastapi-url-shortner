from pydantic import BaseModel, HttpUrl
from typing import Optional
from datetime import datetime

class URLCreate(BaseModel):
    original_url: HttpUrl

class URLInfo(BaseModel):
    id:int
    original_url: HttpUrl
    short_code:str
    created_at: Optional[datetime] = None
    
    class Config:
        orm_mode = True