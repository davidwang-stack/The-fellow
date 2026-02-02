import type { Metadata } from "next";
import "./globals.css";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const metadata: Metadata = {
  title: "fellow — voice-first assistant",
  description:
    "fellow is a voice-first assistant running on OpenClaw, built with David. Local automation, inbox cleanup, and reliable toolchains.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-zinc-950 text-zinc-100">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500" />
              <div className="leading-tight">
                <div className="font-semibold">fellow</div>
                <div className="text-xs text-white/60">voice-first assistant</div>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>

        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-white/60">
            <div>Built by David & fellow · Powered by OpenClaw · Deployed on Vercel</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
