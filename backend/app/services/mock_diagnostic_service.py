from typing import Dict, List

from ..schemas import IncidentCreate


def _score_symptoms(symptoms: Dict[str, bool]) -> int:
    return sum(1 for active in symptoms.values() if active)


def build_mock_diagnostic(incident: IncidentCreate, equipment_name: str, equipment_type: str) -> dict:
    symptoms = incident.symptoms.model_dump()
    symptom_score = _score_symptoms(symptoms)

    probable_cause = "Desalinhamento mecânico e desgaste progressivo"
    involved_parts: List[str] = ["acoplamento", "rolamentos", "base de fixação"]
    recommended_actions: List[str] = [
        "Inspecionar alinhamento a laser e reaperto da base",
        "Verificar condição dos rolamentos e lubrificação",
        "Registrar tendência de vibração para comparação na próxima rodada",
    ]
    priority = "medium"
    operational_risk = "moderate"

    if symptoms["electrical_failure"] or incident.main_symptom.lower().find("elétr") >= 0:
        probable_cause = "Intermitência elétrica no conjunto de acionamento"
        involved_parts = ["painel de comando", "inversor de frequência", "cabos de potência"]
        recommended_actions = [
            "Bloquear equipamento e medir continuidade dos circuitos",
            "Inspecionar bornes, contatores e aquecimento no painel",
            "Validar parâmetros do inversor antes do retorno operacional",
        ]
        priority = "high"
        operational_risk = "high"
    elif symptoms["overheating"] and symptoms["vibration"]:
        probable_cause = "Rolamento em degradação com geração de calor e vibração"
        involved_parts = ["rolamentos", "mancais", "sistema de lubrificação"]
        recommended_actions = [
            "Executar inspeção termográfica e coleta de vibração",
            "Planejar troca de rolamentos no menor intervalo possível",
            "Verificar contaminação ou falta de lubrificante",
        ]
        priority = "high"
        operational_risk = "high"
    elif symptoms["leakage"]:
        probable_cause = "Falha de vedação ou desgaste em retentor"
        involved_parts = ["selos", "retentores", "tubulações de vedação"]
        recommended_actions = [
            "Identificar ponto exato do vazamento",
            "Verificar integridade de selos, juntas e conexões",
            "Avaliar impacto do vazamento sobre segurança e processo",
        ]
        priority = "medium"
        operational_risk = "moderate"
    elif symptoms["total_stop"]:
        probable_cause = "Parada total associada a proteção operacional ou falha crítica"
        involved_parts = ["sistema de proteção", "motor", "acoplamento"]
        recommended_actions = [
            "Manter equipamento indisponível até liberação técnica",
            "Executar checklist de retorno com foco em proteção e acionamento",
            "Documentar causa raiz preliminar antes da retomada",
        ]
        priority = "critical"
        operational_risk = "critical"

    if incident.perceived_urgency == "alta" and priority == "medium":
        priority = "high"
        operational_risk = "high"

    confidence_level = min(0.52 + (symptom_score * 0.06), 0.93)
    observations = (
        f"Diagnóstico simulado para {equipment_name} ({equipment_type}). "
        f"A inferência foi baseada em regras estáticas de sintomas, sem uso de LLM."
    )
    technical_report = (
        f"Relatório técnico preliminar\n\n"
        f"Equipamento: {equipment_name}\n"
        f"Tipo: {equipment_type}\n"
        f"Sintoma principal: {incident.main_symptom}\n"
        f"Descrição operacional: {incident.description}\n"
        f"Turno informado: {incident.shift}\n"
        f"Urgência percebida: {incident.perceived_urgency}\n\n"
        f"Causa provável: {probable_cause}\n"
        f"Prioridade: {priority}\n"
        f"Risco operacional: {operational_risk}\n"
        f"Peças potencialmente envolvidas: {', '.join(involved_parts)}\n"
        f"Ações recomendadas: {'; '.join(recommended_actions)}\n\n"
        f"Observação: diagnóstico simulado, sem integração com modelo de IA nesta fase."
    )

    return {
        "probable_cause": probable_cause,
        "confidence_level": round(confidence_level, 2),
        "priority": priority,
        "operational_risk": operational_risk,
        "recommended_actions": recommended_actions,
        "involved_parts": involved_parts,
        "observations": observations,
        "technical_report": technical_report,
    }
