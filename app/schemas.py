from pydantic import BaseModel, HttpUrl, constr
from typing import Optional, Annotated
from datetime import datetime
import re

class URLCreate(BaseModel):
    original_url: HttpUrl
    short_code: Optional[Annotated[str, constr(min_length=6, max_length=10, pattern='^[a-zA-Z0-9]+$')]] = None

class URLInfo(BaseModel):
    id:int
    original_url: HttpUrl
    short_code:str
    created_at: Optional[datetime] = None
    
    class ConfigDict:
        from_attributes = True