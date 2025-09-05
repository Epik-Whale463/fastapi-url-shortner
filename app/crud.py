from sqlalchemy.orm import Session
import models
import schemas
from datetime import datetime, UTC

def create_url(db: Session, url: schemas.URLCreate, short_code: str):
    db_url = models.URL(
        original_url = str(url.original_url),
        short_code = short_code,
        created_at = datetime.now(UTC)
    )
    
    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    return db_url

def get_urls(db: Session, skip: int =0, limit: int =100):
    return db.query(models.URL).offset(skip).limit(limit).all()

def get_url_by_short_code(db: Session, short_code: str):
    return db.query(models.URL).filter(models.URL.short_code == short_code).first()

def delete_url(db: Session, short_code: str):
    db_url = get_url_by_short_code(db, short_code)
    if db_url:
        db.delete(db_url)
        db.commit()
    return db_url

def check_short_code_exists(db: Session, short_code: str) -> bool:
    return db.query(models.URL).filter(models.URL.short_code == short_code).first() is not None
    