from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Term

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/search")
def search_term(q: str, db: Session = Depends(get_db)):
    term = db.query(Term).filter(Term.term.ilike(f"%{q}%")).first()
    if not term:
        return {"message": "Term not found"}
    return {"term": term.term, "definition": term.definition}
