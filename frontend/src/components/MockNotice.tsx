type MockNoticeProps = {
  title: string;
  description: string;
};

export function MockNotice({ title, description }: MockNoticeProps) {
  return (
    <section className="mock-notice" aria-label="Aviso de diagn\u00f3stico simulado">
      <span className="badge badge-warning">Sem LLM nesta fase</span>
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </section>
  );
}
