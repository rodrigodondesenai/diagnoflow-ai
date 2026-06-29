import { MockNotice } from "../components/MockNotice";
import { SectionHeader } from "../components/SectionHeader";

const tools = [
  "consultar hist\u00f3rico da m\u00e1quina",
  "consultar base de falhas conhecidas",
  "calcular criticidade",
  "gerar checklist t\u00e9cnico",
  "gerar relat\u00f3rio estruturado",
];

export function FutureIntegrationPage() {
  return (
    <div className="page">
      <SectionHeader
        title="Futura integra\u00e7\u00e3o com IA"
        description="Esta tela documenta como a aplica\u00e7\u00e3o poder\u00e1 evoluir para uma camada real de IA generativa na segunda entrega."
      />
      <MockNotice
        title="Sem integra\u00e7\u00e3o real nesta etapa"
        description="Esta p\u00e1gina \u00e9 apenas descritiva. O comportamento atual da aplica\u00e7\u00e3o continua 100% baseado em regras fixas e dados simulados."
      />

      <section className="panel prose">
        <h3>Vis\u00e3o de evolu\u00e7\u00e3o</h3>
        <p>
          A arquitetura atual j\u00e1 separa servi\u00e7o de diagn\u00f3stico, rotas e tipos, permitindo substituir a l\u00f3gica mockada por
          uma chamada para LLM sem reescrever o restante do produto.
        </p>

        <h3>Tools previstas</h3>
        <ul>
          {tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>

        <h3>Cuidados obrigat\u00f3rios</h3>
        <p>
          A segunda fase dever\u00e1 incluir valida\u00e7\u00e3o humana, trilhas de auditoria, controle de contexto, prote\u00e7\u00e3o de dados
          operacionais e mitiga\u00e7\u00e3o de alucina\u00e7\u00e3o antes de qualquer recomenda\u00e7\u00e3o ser tratada como orienta\u00e7\u00e3o t\u00e9cnica.
        </p>

        <h3>Limita\u00e7\u00f5es atuais</h3>
        <p>
          Nenhum modelo foi integrado nesta etapa. Todas as sa\u00eddas s\u00e3o determin\u00edsticas, baseadas em regras simples e \u00fateis
          apenas para demonstra\u00e7\u00e3o funcional da jornada do usu\u00e1rio.
        </p>
      </section>
    </div>
  );
}
