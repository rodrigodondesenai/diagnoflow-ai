# DiagnoFlow AI

DiagnoFlow AI e uma aplicacao full stack para triagem tecnica simulada de maquinas rotativas industriais. A proposta da primeira entrega da disciplina e demonstrar uma jornada funcional de registro de sintomas, organizacao de ocorrencias e geracao de diagnostico tecnico mockado, sem integrar nenhum LLM nesta fase.

## Problema e solucao

Em rotinas de manutencao industrial, tecnicos precisam registrar sinais iniciais de falha com rapidez, manter historico organizado e produzir um parecer preliminar antes de uma analise aprofundada. O problema escolhido tem complexidade suficiente porque envolve contexto operacional, criticidade do ativo, multiplos sintomas concorrentes e necessidade de priorizacao.

A solucao entregue foi uma aplicacao com:

- cadastro de equipamentos;
- abertura de ocorrencia com sintomas operacionais;
- diagnostico simulado baseado em regras;
- historico filtravel;
- relatorio tecnico textual;
- documentacao da futura integracao com IA generativa.

## O que esta fase entrega

- Endpoint funcional em FastAPI.
- Frontend React com multiplas telas navegaveis.
- Dados simulados persistidos em SQLite.
- Interacoes de cadastro, listagem, historico e geracao de diagnostico mockado.
- Avisos explicitos na interface e na API de que nao ha LLM integrado nesta etapa.

## O que nao existe nesta fase

- Nenhuma chamada para OpenAI, Anthropic, Gemini, Ollama ou outro provedor.
- Nenhuma inferencia real com modelo generativo.
- Nenhuma autenticacao.
- Nenhum deploy com Docker.

## Arquitetura

```text
frontend (React + Vite + TypeScript)
        |
        v
backend (FastAPI + SQLAlchemy)
        |
        v
SQLite local
```

### Estrutura do repositorio

```text
diagnoflow-ai/
|- backend/
|  |- app/
|  |  |- main.py
|  |  |- database.py
|  |  |- models.py
|  |  |- schemas.py
|  |  |- seed.py
|  |  |- routes/
|  |  `- services/
|  `- tests/
|- frontend/
|  `- src/
|- docs/
|- prompts/
|- README.md
`- .gitignore
```

## Escolhas de design

- FastAPI foi escolhida para entregar API REST clara, documentacao automatica em `/docs` e validacao simples com Pydantic.
- SQLite foi usado para reduzir complexidade de setup na avaliacao intermediaria.
- React com TypeScript foi adotado para permitir interface navegavel, componentes reutilizaveis e tipagem explicita de `Equipment`, `Incident` e `Diagnostic`.
- O diagnostico mockado foi isolado em `backend/app/services/mock_diagnostic_service.py`, facilitando a troca futura por uma integracao real com LLM.
- A interface destaca em varios pontos que o diagnostico e simulado, evitando qualquer ambiguidade na avaliacao.

## Como a IA sera integrada futuramente

Na segunda fase, a regra deterministica atual podera ser substituida por um fluxo de orquestracao com:

1. coleta da ocorrencia e do contexto do equipamento;
2. consulta a tools internas;
3. chamada a um LLM com prompt tecnico controlado;
4. validacao de saida estruturada;
5. revisao humana antes de decisoes criticas.

As tools planejadas estao documentadas em [docs/future-llm-integration.md](docs/future-llm-integration.md) e incluem:

- consultar historico da maquina;
- consultar base de falhas conhecidas;
- calcular criticidade;
- gerar checklist tecnico;
- gerar relatorio estruturado.

## Funcionalidades implementadas

- Dashboard com totais operacionais e ultimas ocorrencias.
- Cadastro de equipamentos com criticidade e status.
- Registro de nova ocorrencia com multiplos sintomas.
- Diagnostico simulado com causa provavel, confianca, prioridade, risco, acoes, pecas e observacoes.
- Historico com filtros por equipamento, criticidade e status.
- Relatorio tecnico textual com botao de copia.
- Pagina explicando a futura integracao com IA.

## Como rodar o backend

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Swagger/OpenAPI:

- `http://127.0.0.1:8000/docs`

## Como rodar o frontend

```powershell
cd frontend
npm install
npm run dev
```

Build de producao:

```powershell
npm run build
```

## Endpoints principais

- `GET /`
- `GET /dashboard`
- `GET /equipment`
- `POST /equipment`
- `GET /incidents`
- `POST /incidents`
- `GET /diagnostics/{incident_id}`

## Dados iniciais

Ao iniciar a API, o banco local e criado automaticamente e um seed adiciona:

- equipamentos de exemplo;
- uma ocorrencia inicial;
- um diagnostico simulado ja associado ao historico.

## Comandos de validacao

Backend:

```powershell
cd backend
.\.venv\Scripts\python -m pytest
```

Frontend:

```powershell
cd frontend
npm run build
```

Repositorio:

```powershell
git status
```

## Evidencia de uso do Codex

O uso do agente de codificacao esta documentado em [docs/agent-prompts.md](docs/agent-prompts.md), incluindo:

- prompt inicial da tarefa;
- iteracoes de implementacao;
- erros encontrados na validacao;
- correcoes aplicadas;
- comandos executados;
- decisoes tomadas para estabilizar a entrega.

## O que funcionou bem com o Codex

- Geracao rapida da estrutura completa de backend, frontend e documentacao.
- Criacao coerente de contratos entre API e interface.
- Organizacao do repositorio em commits separados por backend, frontend e documentacao.
- Execucao iterativa de validacao local para encontrar e corrigir falhas antes da revisao final.

## O que nao funcionou de primeira e precisou de correcao

- `npm install` falhou inicialmente por restricao de rede/cache do ambiente.
- A criacao da `venv` falhou no `ensurepip` e precisou ser refeita com permissao ampliada.
- O build do frontend falhou por ausencia da tipagem de `import.meta.env`.
- Os testes do backend falharam inicialmente porque o `TestClient` nao estava disparando o `lifespan` da aplicacao fora de contexto.
- Artefatos de build do Vite apareceram no repositorio e foram limpos na revisao.

## Limitacoes da primeira fase

- Diagnostico inteiramente mockado por regras simples.
- Sem consumo de APIs externas.
- Sem autenticacao e sem controle de perfis.
- Sem auditoria avancada das acoes do usuario.
- Sem observabilidade de producao.
- Sem deploy automatizado.

## Estado atual para a avaliacao intermediaria

- Aplicacao funcional localmente.
- Backend validado com `pytest`.
- Frontend validado com `npm run build`.
- Repositorio organizado e documentado.
- Mensagem explicita de que nao ha LLM nesta fase.

## Documentacao complementar

- [docs/agent-prompts.md](docs/agent-prompts.md)
- [docs/design-decisions.md](docs/design-decisions.md)
- [docs/future-llm-integration.md](docs/future-llm-integration.md)
- [prompts/future-system-prompt.txt](prompts/future-system-prompt.txt)
