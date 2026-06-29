import { useEffect, useState } from "react";
import { MockNotice } from "../components/MockNotice";
import { SectionHeader } from "../components/SectionHeader";
import { api } from "../services/api";
import { Equipment, IncidentWithDiagnostic } from "../types";

export function HistoryPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [items, setItems] = useState<IncidentWithDiagnostic[]>([]);
  const [filters, setFilters] = useState({ equipmentId: "", criticality: "", status: "" });

  useEffect(() => {
    api.listEquipment().then(setEquipment);
  }, []);

  useEffect(() => {
    api.listIncidents(filters).then(setItems);
  }, [filters]);

  return (
    <div className="page">
      <SectionHeader
        title="Histórico"
        description="Consulte ocorrências registradas e refine a leitura com filtros por ativo, criticidade e status."
      />
      <MockNotice
        title="Histórico alimentado por dados simulados"
        description="As ocorrências exibidas nesta etapa servem para comprovar o fluxo funcional da aplicação antes da integração com IA generativa."
      />

      <section className="panel">
        <div className="filter-row">
          <select value={filters.equipmentId} onChange={(e) => setFilters({ ...filters, equipmentId: e.target.value })}>
            <option value="">Todos os equipamentos</option>
            {equipment.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <select value={filters.criticality} onChange={(e) => setFilters({ ...filters, criticality: e.target.value })}>
            <option value="">Todas as criticidades</option>
            <option value="baixa">Baixa</option>
            <option value="média">Média</option>
            <option value="alta">Alta</option>
          </select>
          <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
            <option value="">Todos os status</option>
            <option value="open">Aberta</option>
            <option value="closed">Encerrada</option>
          </select>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Equipamento</th>
                <th>Sintoma</th>
                <th>Criticidade</th>
                <th>Status</th>
                <th>Prioridade</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {items.map(({ incident, diagnostic }) => (
                <tr key={incident.id}>
                  <td>{incident.equipment.name}</td>
                  <td>{incident.main_symptom}</td>
                  <td>{incident.equipment.criticality}</td>
                  <td>{incident.status}</td>
                  <td>{diagnostic.priority}</td>
                  <td>{new Date(incident.created_at).toLocaleDateString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
