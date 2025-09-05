from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DB_URL = "sqlite:///./url_shortener.db"

engine = create_engine(SQLALCHEMY_DB_URL, connect_args={"check_same_thread": False})

sessionLocal = sessionmaker(autoflush=False, bind=engine, autocommit=False)

# function to get a new database session for fastAPI
def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()