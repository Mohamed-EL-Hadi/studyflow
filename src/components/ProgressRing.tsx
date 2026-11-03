type Props = { code: string; percent: number; color?: string };

export default function ProgressRing({ code, percent, color = "#3b6cff" }: Props) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <svg width="70" height="70" viewBox="0 0 70 70">
      <circle cx="35" cy="35" r={r} fill="none" strokeWidth="5" style={{ stroke: "var(--border)" }} />
      <circle
        cx="35" cy="35" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={c} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 35 35)"
      />
      <text x="35" y="33" textAnchor="middle" fontSize="12" fontWeight="700" style={{ fill: "var(--text)" }}>{code}</text>
      <text x="35" y="46" textAnchor="middle" fontSize="10" style={{ fill: "var(--muted)" }}>{percent}%</text>
    </svg>
  );
}