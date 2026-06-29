type StatCardProps = {
  label: string;
  value: number;
  tone?: "neutral" | "alert" | "danger";
};

export function StatCard({ label, value, tone = "neutral" }: StatCardProps) {
  return (
    <article className={`stat-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
