import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const cfgPath = path.join(ROOT, "scripts", "x", "accounts.json");
const outPath = path.join(ROOT, "src", "data", "x-digest.json");

const token = process.env.X_BEARER_TOKEN;
if (!token) {
  console.error("Missing X_BEARER_TOKEN env var.");
  process.exit(2);
}

const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
const accounts = cfg.accounts || [];
const maxTweetsPerAccount = cfg.maxTweetsPerAccount ?? 5;
const lookbackDays = cfg.lookbackDays ?? 2;

const headers = {
  Authorization: `Bearer ${token}`,
};

async function getJson(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} :: ${url}\n${text}`);
  }
  return res.json();
}

function isoDaysAgo(days) {
  const d = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return d.toISOString();
}

async function resolveUserId(username) {
  const url = `https://api.x.com/2/users/by/username/${encodeURIComponent(username)}?user.fields=profile_image_url,verified`; 
  const j = await getJson(url);
  return j.data;
}

async function fetchTweets(userId) {
  const start_time = encodeURIComponent(isoDaysAgo(lookbackDays));
  const url = `https://api.x.com/2/users/${userId}/tweets?max_results=${Math.min(100, Math.max(5, maxTweetsPerAccount))}&tweet.fields=created_at,public_metrics,entities&exclude=retweets,replies&start_time=${start_time}`;
  const j = await getJson(url);
  return j.data || [];
}

function tweetUrl(username, id) {
  return `https://x.com/${username}/status/${id}`;
}

function pickText(t) {
  return (t.text || "").replace(/\s+/g, " ").trim();
}

(async () => {
  const now = new Date().toISOString();
  const results = [];

  for (const username of accounts) {
    try {
      const u = await resolveUserId(username);
      const tweets = await fetchTweets(u.id);
      const items = tweets
        .slice(0, maxTweetsPerAccount)
        .map((t) => ({
          id: t.id,
          url: tweetUrl(username, t.id),
          text: pickText(t),
          created_at: t.created_at,
          metrics: t.public_metrics || {},
        }));

      results.push({
        username,
        name: u.name,
        verified: !!u.verified,
        profile_image_url: u.profile_image_url,
        items,
      });
    } catch (e) {
      results.push({
        username,
        error: String(e?.message || e),
        items: [],
      });
    }
  }

  const payload = {
    generated_at: now,
    lookbackDays,
    maxTweetsPerAccount,
    accounts: results,
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2));
  console.log(`Wrote ${outPath}`);
})();
