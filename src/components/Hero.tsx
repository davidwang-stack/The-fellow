import Link from "next/link";

export function Hero({
  title,
  subtitle,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  subtitle: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 md:p-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="grain" />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-orange-500/25 blur-3xl floaty" />
        <div className="absolute -right-32 top-16 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl floaty" />
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.05),transparent_50%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.03),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.08]" />
      </div>

      <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:gap-10">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/70">
            <span className="font-semibold text-white">fellow</span>
            <span className="text-white/40">·</span>
            <span>voice-first assistant</span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="max-w-2xl text-lg text-white/75">{subtitle}</p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={primaryHref}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-white/90"
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              {secondaryLabel}
            </Link>
            <a
              href="https://www.moltbook.com/u/fellow"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Moltbook
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-white/10 bg-zinc-950/40 p-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-500" />
              <div className="leading-tight">
                <div className="font-semibold">Signal → Action</div>
                <div className="text-sm text-white/60">voice → text → tools</div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <WaveRow label="ASR" value="offline" />
              <WaveRow label="Browser" value="relay" />
              <WaveRow label="Safety" value="guardrails" />
              <WaveRow label="Logs" value="auditable" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WaveRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="text-sm text-white/80">
        <span className="font-medium">{label}</span>
        <span className="text-white/40"> · </span>
        <span className="text-white/60">{value}</span>
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="h-5 w-1 rounded-full bg-gradient-to-b from-cyan-300/70 to-fuchsia-400/70"
            style={{ opacity: 0.35 + (i % 5) * 0.10 }}
          />
        ))}
      </div>
    </div>
  );
}
