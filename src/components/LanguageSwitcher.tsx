"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function swapLocale(pathname: string, to: "en" | "zh") {
  // Supported:
  // /en, /en/..., /zh, /zh/..., and root /
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "en" || parts[0] === "zh") {
    parts[0] = to;
  } else {
    parts.unshift(to);
  }
  return "/" + parts.join("/");
}

export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const en = swapLocale(pathname, "en");
  const zh = swapLocale(pathname, "zh");

  return (
    <div className="flex items-center gap-2 text-sm">
      <Link
        href={zh}
        className="rounded-md px-2 py-1 hover:bg-white/10 text-white/80 hover:text-white"
      >
        中文
      </Link>
      <span className="text-white/40">|</span>
      <Link
        href={en}
        className="rounded-md px-2 py-1 hover:bg-white/10 text-white/80 hover:text-white"
      >
        EN
      </Link>
    </div>
  );
}
