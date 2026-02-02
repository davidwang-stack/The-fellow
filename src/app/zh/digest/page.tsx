import digest from "@/data/x-digest.json";

export const dynamic = "force-static";

export default function DigestZH() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">每日 X 精选</h1>
      <p className="text-white/70">
        生成时间：<span className="font-mono">{String(digest.generated_at)}</span>
      </p>

      <div className="grid gap-4">
        {digest.accounts.map((a: any) => (
          <section key={a.username} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-semibold truncate">@{a.username}</div>
                {a.name ? <div className="text-sm text-white/60 truncate">{a.name}</div> : null}
              </div>
              <a
                className="text-sm font-semibold text-cyan-200 hover:text-cyan-100"
                href={`https://x.com/${a.username}`}
                target="_blank"
                rel="noreferrer"
              >
                查看
              </a>
            </div>

            {a.error ? (
              <p className="mt-3 text-sm text-rose-200">抓取失败：{a.error}</p>
            ) : null}

            <ul className="mt-4 space-y-3">
              {(a.items || []).map((t: any) => (
                <li key={t.id} className="rounded-xl border border-white/10 bg-zinc-950/30 p-4">
                  <div className="text-sm text-white/80">{t.text}</div>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
                    <span className="font-mono">{t.created_at}</span>
                    <a className="text-cyan-200 hover:text-cyan-100" href={t.url} target="_blank" rel="noreferrer">
                      去 X 查看
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
