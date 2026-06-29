from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/diagnostics", tags=["diagnostics"])


@router.get("/{incident_id}", response_model=schemas.DiagnosticRead)
def get_diagnostic(incident_id: int, db: Session = Depends(get_db)):
    diagnostic = db.query(models.Diagnostic).filter(models.Diagnostic.incident_id == incident_id).first()
    if not diagnostic:
        raise HTTPException(status_code=404, detail="Diagnostic not found.")
    return diagnostic
