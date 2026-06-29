from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session, joinedload

from . import models, schemas
from .database import Base, SessionLocal, engine, get_db
from .routes import diagnostics, equipment, incidents
from .seed import seed_data


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_data(db)
    finally:
        db.close()
    yield


app = FastAPI(
    title="DiagnoFlow AI API",
    version="0.1.0",
    description="API para triagem técnica simulada de máquinas rotativas industriais.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(equipment.router)
app.include_router(incidents.router)
app.include_router(diagnostics.router)


@app.get("/")
def root():
    return {
        "name": "DiagnoFlow AI",
        "message": "Diagnóstico simulado ativo. Nenhum LLM foi integrado nesta fase.",
    }


@app.get("/dashboard", response_model=schemas.DashboardResponse)
def dashboard(db: Session = Depends(get_db)):
    latest = (
        db.query(models.Incident)
        .options(joinedload(models.Incident.equipment), joinedload(models.Incident.diagnostic))
        .order_by(models.Incident.created_at.desc())
        .limit(5)
        .all()
    )
    summary = schemas.DashboardSummary(
        total_equipment=db.query(models.Equipment).count(),
        open_incidents=db.query(models.Incident).filter(models.Incident.status == "open").count(),
        critical_alerts=db.query(models.Diagnostic).filter(models.Diagnostic.priority == "critical").count(),
        simulated_diagnostics=db.query(models.Diagnostic).count(),
    )
    return {
        "summary": summary,
        "latest_incidents": [{"incident": incident, "diagnostic": incident.diagnostic} for incident in latest if incident.diagnostic],
    }
