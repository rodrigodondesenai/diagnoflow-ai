type MockNoticeProps = {
  title: string;
  description: string;
};

export function MockNotice({ title, description }: MockNoticeProps) {
  return (
    <section className="mock-notice" aria-label="Aviso de diagnóstico simulado">
      <span className="badge badge-warning">Sem LLM nesta fase</span>
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </section>
  );
}
