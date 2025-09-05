from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models
import schemas
import crud
import database
import utils
from fastapi.responses import RedirectResponse

router = APIRouter()

@router.post("/shorten_url", response_model=schemas.URLInfo)
def shorten_url(url: schemas.URLCreate, db: Session = Depends(database.get_db)):
    if url.short_code:
        if crud.check_short_code_exists(db, url.short_code):
            raise HTTPException(status_code=400, detail="Short code already exists")
        return crud.create_url(db=db, url=url, short_code=url.short_code)
    else:
        # Generate unique short code
        short_code = utils.generate_short_code()
        while crud.check_short_code_exists(db, short_code):
            short_code = utils.generate_short_code()
        return crud.create_url(db=db, url=url, short_code=short_code)

@router.get("/{short_code}")
def redirect_to_original(short_code: str, db: Session = Depends(database.get_db)):
    db_url = crud.get_url_by_short_code(db=db, short_code=short_code)
    if db_url is None:
        raise HTTPException(status_code=404, detail="Short URL not found")
    return RedirectResponse(db_url.original_url)
