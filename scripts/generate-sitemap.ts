// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { readFileSync, writeFileSync } from "fs"
import { resolve } from "path"

const BASE_URL = "https://home.edu-total.com"

function loadEnv() {
  try {
    const raw = readFileSync(resolve(".env"), "utf8")
    for (const line of raw.split("\n")) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
      if (m) process.env[m[1]] = m[2].replace(/^"|"$/g, "")
    }
  } catch {
    // no .env (e.g. CI build); env vars may be set externally
  }
}
loadEnv()

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY

interface SitemapEntry {
  path: string
  lastmod?: string
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: string
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/who-we-are", changefreq: "monthly", priority: "0.8" },
  { path: "/services", changefreq: "weekly", priority: "0.9" },
  { path: "/industries", changefreq: "monthly", priority: "0.8" },
  { path: "/insights", changefreq: "weekly", priority: "0.8" },
  { path: "/clients", changefreq: "monthly", priority: "0.7" },
  { path: "/careers", changefreq: "weekly", priority: "0.6" },
  { path: "/gallery", changefreq: "monthly", priority: "0.5" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms-conditions", changefreq: "yearly", priority: "0.3" },
]

async function fetchSlugs(table: string): Promise<{ slug: string }[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return []
  try {
    const url = `${SUPABASE_URL}/rest/v1/${table}?select=slug&published=eq.true`
    const res = await fetch(url, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    })
    if (!res.ok) return []
    return (await res.json()) as { slug: string }[]
  } catch {
    return []
  }
}

function xmlEscape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${xmlEscape(BASE_URL + encodeURI(e.path))}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  )

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n")
}

const entries: SitemapEntry[] = [...staticEntries]

const [services, industries, insights] = await Promise.all([
  fetchSlugs("services"),
  fetchSlugs("industries"),
  fetchSlugs("insights"),
])
for (const r of services) entries.push({ path: `/services/${r.slug}`, changefreq: "monthly", priority: "0.7" })
for (const r of industries) entries.push({ path: `/industries/${r.slug}`, changefreq: "monthly", priority: "0.7" })
for (const r of insights) entries.push({ path: `/insights/${r.slug}`, changefreq: "monthly", priority: "0.6" })

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries))
console.log(`sitemap.xml written (${entries.length} entries)`)
