# Future LLM Integration

## Objetivo da segunda fase

Substituir ou complementar o mecanismo determinístico atual por um orquestrador com LLM capaz de produzir triagem técnica mais rica, mantendo validação humana.

## Fluxo previsto

1. Coletar ocorrência, contexto do equipamento e histórico.
2. Consultar tools internas para enriquecer o contexto.
3. Invocar o modelo com system prompt técnico e parâmetros controlados.
4. Validar saída estruturada antes de exibir ao usuário.
5. Exigir confirmação humana para recomendações críticas.

## Tools planejadas

- consultar histórico da máquina;
- consultar base de falhas conhecidas;
- calcular criticidade;
- gerar checklist técnico;
- gerar relatório estruturado.

## Riscos e mitigação

- Alucinação: exigir referências de evidência e revisão humana.
- Excesso de confiança: exibir nível de confiança e incertezas.
- Segurança: limitar acesso a dados operacionais sensíveis.
- Padronização: validar structured outputs com schema rígido.
