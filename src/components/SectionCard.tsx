export function SectionCard({
  title,
  body,
  bullets,
}: {
  title: string;
  body?: string;
  bullets?: string[];
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      {body ? <p className="mt-2 text-white/70">{body}</p> : null}
      {bullets ? (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
