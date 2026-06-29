type SectionHeaderProps = {
  title: string;
  description: string;
};

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <div>
        <p className="eyebrow">Operação assistida</p>
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
    </header>
  );
}
