import { useEffect, useState } from "react";
import { MockNotice } from "../components/MockNotice";
import { SectionHeader } from "../components/SectionHeader";
import { StatCard } from "../components/StatCard";
import { api } from "../services/api";
import { DashboardResponse } from "../types";

export function DashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getDashboard().then(setData).catch((err: Error) => setError(err.message));
  }, []);

  if (error) {
    return <div className="panel">Erro ao carregar o painel operacional: {error}</div>;
  }

  if (!data) {
    return <div className="panel">Carregando indicadores operacionais...</div>;
  }

  return (
    <div className="page">
      <SectionHeader
        title="Painel operacional"
        description="Vis\u00e3o r\u00e1pida da planta, com alertas cr\u00edticos, ocorr\u00eancias abertas e diagn\u00f3sticos simulados mais recentes."
      />

      <section className="hero-card">
        <div>
          <span className="badge badge-info">Entrega intermedi\u00e1ria funcional</span>
          <h3>Diagn\u00f3stico simulado para triagem t\u00e9cnica de m\u00e1quinas rotativas</h3>
        </div>
        <p>Aplica\u00e7\u00e3o pronta para demonstra\u00e7\u00e3o local, com regras mockadas e navega\u00e7\u00e3o completa.</p>
      </section>

      <MockNotice
        title="Diagn\u00f3stico simulado"
        description="Nenhum LLM foi integrado nesta fase. As respostas exibidas nesta aplica\u00e7\u00e3o s\u00e3o geradas por regras est\u00e1ticas para fins de demonstra\u00e7\u00e3o da entrega intermedi\u00e1ria."
      />

      <section className="stat-grid">
        <StatCard label="Equipamentos cadastrados" value={data.summary.total_equipment} />
        <StatCard label="Ocorr\u00eancias abertas" value={data.summary.open_incidents} tone="alert" />
        <StatCard label="Alertas cr\u00edticos" value={data.summary.critical_alerts} tone="danger" />
        <StatCard label="Diagn\u00f3sticos simulados" value={data.summary.simulated_diagnostics} />
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>\u00daltimas ocorr\u00eancias</h3>
        </div>
        <div className="incident-list">
          {data.latest_incidents.map(({ incident, diagnostic }) => (
            <article key={incident.id} className="incident-card">
              <div className="incident-card-head">
                <div>
                  <h4>{incident.equipment.name}</h4>
                  <p>
                    {incident.main_symptom} • {incident.shift}
                  </p>
                </div>
                <span className={`badge badge-${diagnostic.priority}`}>{diagnostic.priority}</span>
              </div>
              <p>{diagnostic.probable_cause}</p>
              <small>{new Date(incident.created_at).toLocaleString("pt-BR")}</small>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
