# DiagnoFlow AI

DiagnoFlow AI é uma aplicação full stack para triagem técnica simulada de máquinas rotativas industriais. Nesta primeira fase, o sistema oferece cadastro de equipamentos, registro de ocorrências, diagnóstico mockado por regras simples, histórico filtrável e relatório técnico textual, sem qualquer integração com LLM.

## Stack

- Backend: FastAPI + SQLAlchemy + SQLite
- Frontend: React + Vite + TypeScript
- Banco local: SQLite

## Estrutura

```text
diagnoflow-ai/
├── backend/
├── docs/
├── frontend/
├── prompts/
├── README.md
└── .gitignore
```

## Funcionalidades

- Dashboard com totais operacionais e ocorrências recentes.
- Cadastro simples de equipamentos.
- Registro de nova ocorrência com sintomas marcáveis.
- Geração de diagnóstico simulado com causa provável, confiança, prioridade, risco, ações e peças envolvidas.
- Histórico com filtros por equipamento, criticidade e status.
- Relatório técnico textual com botão para copiar.
- Página de documentação da futura integração com IA.

## Como rodar o backend

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Documentação Swagger: `http://127.0.0.1:8000/docs`

## Como rodar o frontend

```powershell
cd frontend
npm install
npm run dev
```

Para build de produção:

```powershell
npm run build
```

## Endpoints principais

- `GET /dashboard`
- `GET /equipment`
- `POST /equipment`
- `GET /incidents`
- `POST /incidents`
- `GET /diagnostics/{incident_id}`

## Dados iniciais

Ao iniciar a API, o banco é criado automaticamente e um seed adiciona equipamentos de exemplo e uma ocorrência inicial com diagnóstico simulado.

## Documentação adicional

- `docs/agent-prompts.md`
- `docs/design-decisions.md`
- `docs/future-llm-integration.md`
- `prompts/future-system-prompt.txt`

## Observações

- Não há autenticação nesta fase.
- Não há Docker nesta fase.
- Não há integração com OpenAI, Anthropic, Gemini, Ollama ou qualquer outro provedor de IA nesta fase.
- O backend já separa a camada de serviço para facilitar a futura troca por um fluxo com LLM e tools.
