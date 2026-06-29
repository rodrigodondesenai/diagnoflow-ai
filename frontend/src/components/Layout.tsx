import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Painel" },
  { to: "/equipamentos", label: "Equipamentos" },
  { to: "/nova-ocorrencia", label: "Nova Ocorr\u00eancia" },
  { to: "/historico", label: "Hist\u00f3rico" },
  { to: "/futuro-ia", label: "Futura IA" },
];

export function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">DiagnoFlow AI</p>
          <h1>Triagem t\u00e9cnica industrial</h1>
          <p className="sidebar-copy">
            Plataforma de apoio para registrar sintomas, organizar ocorr\u00eancias e emitir diagn\u00f3sticos simulados.
          </p>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="badge badge-warning">Sem LLM nesta fase</span>
          <p>Arquitetura pronta para futura integra\u00e7\u00e3o com prompts, tools e sa\u00eddas estruturadas.</p>
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
