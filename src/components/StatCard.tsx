type Props = { label: string; value: number; sub: string; color: string };

export default function StatCard({ label, value, sub, color }: Props) {
  return (
    <div className="card">
      <div style={{ color, fontSize: 12, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 36, fontWeight: 700 }}>{value}</div>
      <div style={{ color: "var(--muted)", fontSize: 12 }}>{sub}</div>
    </div>
  );
}