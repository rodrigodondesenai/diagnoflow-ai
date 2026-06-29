# Design Decisions

## Arquitetura

- Backend em FastAPI com SQLAlchemy e SQLite para simplicidade local.
- Frontend em React + Vite + TypeScript para navegação fluida e tipagem explícita.
- Serviço de diagnóstico isolado em `mock_diagnostic_service.py` para facilitar substituição futura por LLM.

## Produto

- Dashboard com indicadores rápidos e ocorrências recentes.
- Fluxo principal centrado em cadastrar ativos, abrir ocorrência e analisar histórico.
- Relatório textual copiado para a área de transferência para simular uso operacional imediato.

## UX

- Interface com visual técnico e responsivo.
- Navegação lateral fixa em desktop e empilhada em mobile.
- Mensagem explícita informando ausência de IA real nesta fase.
