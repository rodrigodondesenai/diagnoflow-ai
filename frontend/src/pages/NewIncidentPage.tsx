import { FormEvent, useEffect, useMemo, useState } from "react";
import { MockNotice } from "../components/MockNotice";
import { SectionHeader } from "../components/SectionHeader";
import { api } from "../services/api";
import { Equipment, IncidentWithDiagnostic, SymptomFlags } from "../types";

const initialSymptoms: SymptomFlags = {
  abnormal_noise: false,
  vibration: false,
  overheating: false,
  leakage: false,
  electrical_failure: false,
  total_stop: false,
  performance_loss: false,
};

export function NewIncidentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [result, setResult] = useState<IncidentWithDiagnostic | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    equipment_id: "",
    main_symptom: "",
    description: "",
    shift: "manh\u00e3",
    perceived_urgency: "m\u00e9dia",
    status: "open",
  });
  const [symptoms, setSymptoms] = useState<SymptomFlags>(initialSymptoms);

  useEffect(() => {
    api.listEquipment().then(setEquipment).catch((err: Error) => setError(err.message));
  }, []);

  const selectedEquipment = useMemo(
    () => equipment.find((item) => item.id === Number(form.equipment_id)),
    [equipment, form.equipment_id],
  );

  const toggleSymptom = (key: keyof SymptomFlags) => {
    setSymptoms((current) => ({ ...current, [key]: !current[key] }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      const payload = {
        ...form,
        equipment_id: Number(form.equipment_id),
        symptoms,
      };
      const response = await api.createIncident(payload);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao registrar ocorrencia.");
    }
  };

  return (
    <div className="page split-page">
      <div>
        <SectionHeader
          title="Nova ocorr\u00eancia"
          description="Registre sintomas operacionais e receba um diagn\u00f3stico t\u00e9cnico simulado baseado em regras simples."
        />
        <MockNotice
          title="Fluxo mockado para demonstra\u00e7\u00e3o"
          description="Ao enviar a ocorr\u00eancia, o sistema gera uma resposta determin\u00edstica com base nos sintomas informados. Nenhum modelo generativo participa deste processo."
        />
        <section className="panel">
          <form className="form-grid" onSubmit={handleSubmit}>
            {error ? <div className="form-error">{error}</div> : null}
            <select value={form.equipment_id} onChange={(e) => setForm({ ...form, equipment_id: e.target.value })} required>
              <option value="">Selecione o equipamento</option>
              {equipment.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              placeholder="Sintoma principal"
              value={form.main_symptom}
              onChange={(e) => setForm({ ...form, main_symptom: e.target.value })}
              required
            />
            <textarea
              placeholder="Descri\u00e7\u00e3o operacional"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={5}
              required
            />
            <select value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value })}>
              <option value="manh\u00e3">Manh\u00e3</option>
              <option value="tarde">Tarde</option>
              <option value="noite">Noite</option>
            </select>
            <select value={form.perceived_urgency} onChange={(e) => setForm({ ...form, perceived_urgency: e.target.value })}>
              <option value="baixa">Baixa</option>
              <option value="m\u00e9dia">M\u00e9dia</option>
              <option value="alta">Alta</option>
            </select>

            <div className="checkbox-grid">
              {[
                ["abnormal_noise", "Ru\u00eddo anormal"],
                ["vibration", "Vibra\u00e7\u00e3o"],
                ["overheating", "Superaquecimento"],
                ["leakage", "Vazamento"],
                ["electrical_failure", "Falha el\u00e9trica"],
                ["total_stop", "Parada total"],
                ["performance_loss", "Perda de desempenho"],
              ].map(([key, label]) => (
                <label key={key} className="checkbox-card">
                  <input
                    type="checkbox"
                    checked={symptoms[key as keyof SymptomFlags]}
                    onChange={() => toggleSymptom(key as keyof SymptomFlags)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            <button type="submit">Gerar diagn\u00f3stico simulado</button>
          </form>
        </section>
      </div>

      <section className="panel result-panel">
        <div className="panel-header">
          <h3>Sa\u00edda do diagn\u00f3stico</h3>
        </div>
        {result ? (
          <>
            <span className="badge badge-warning">Diagn\u00f3stico simulado - nenhum LLM foi integrado nesta fase.</span>
            <h4>{result.diagnostic.probable_cause}</h4>
            <p>
              Equipamento: <strong>{selectedEquipment?.name ?? result.incident.equipment.name}</strong>
            </p>
            <p>Confian\u00e7a simulada: {Math.round(result.diagnostic.confidence_level * 100)}%</p>
            <p>Prioridade: {result.diagnostic.priority}</p>
            <p>Risco operacional: {result.diagnostic.operational_risk}</p>
            <p>Observa\u00e7\u00f5es: {result.diagnostic.observations}</p>
            <div>
              <strong>A\u00e7\u00f5es recomendadas</strong>
              <ul>
                {result.diagnostic.recommended_actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Pe\u00e7as possivelmente envolvidas</strong>
              <p>{result.diagnostic.involved_parts.join(", ")}</p>
            </div>
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigator.clipboard.writeText(result.diagnostic.technical_report)}
            >
              Copiar relat\u00f3rio t\u00e9cnico
            </button>
          </>
        ) : (
          <p>Preencha o formul\u00e1rio para gerar uma an\u00e1lise mockada e um relat\u00f3rio textual reutiliz\u00e1vel.</p>
        )}
      </section>
    </div>
  );
}
