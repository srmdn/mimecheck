import { Hono } from "hono";
import { search, POPULAR, MIME_DB, type Category, type MimeEntry } from "./mime-db";

const app = new Hono();

const CATEGORY_STYLES: Record<Category, { badge: string; dot: string }> = {
  image:       { badge: "bg-blue-50 text-blue-700 border-blue-200",   dot: "bg-blue-400" },
  video:       { badge: "bg-purple-50 text-purple-700 border-purple-200", dot: "bg-purple-400" },
  audio:       { badge: "bg-pink-50 text-pink-700 border-pink-200",   dot: "bg-pink-400" },
  text:        { badge: "bg-green-50 text-green-700 border-green-200", dot: "bg-green-400" },
  application: { badge: "bg-orange-50 text-orange-700 border-orange-200", dot: "bg-orange-400" },
  font:        { badge: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-400" },
  multipart:   { badge: "bg-slate-100 text-slate-600 border-slate-200", dot: "bg-slate-400" },
};

function Layout({ children, title }: { children: any; title?: string }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ? `${title} — mimecheck` : "mimecheck"}</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-white text-slate-900 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}

function CategoryBadge({ category }: { category: Category }) {
  const { badge } = CATEGORY_STYLES[category];
  return (
    <span class={`text-xs font-semibold px-2 py-0.5 rounded border capitalize ${badge}`}>
      {category}
    </span>
  );
}

function MimeCard({ entry }: { entry: MimeEntry }) {
  return (
    <div class="rounded-lg border border-slate-200 p-5 space-y-3">
      <div class="flex items-start justify-between gap-3 flex-wrap">
        <div class="space-y-1">
          <code class="font-mono text-base font-bold text-indigo-700">{entry.type}</code>
          <p class="text-sm font-medium text-slate-700">{entry.name}</p>
        </div>
        <CategoryBadge category={entry.category} />
      </div>

      {entry.extensions.length > 0 && (
        <div class="flex flex-wrap gap-1.5">
          {entry.extensions.map((ext) => (
            <code class="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              {ext}
            </code>
          ))}
        </div>
      )}

      <p class="text-sm text-slate-600 leading-relaxed">{entry.description}</p>

      {entry.notes && (
        <div class="flex gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
          <span class="shrink-0">⚠</span>
          <span>{entry.notes}</span>
        </div>
      )}

      {entry.example && (
        <div>
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Example</p>
          <pre class="bg-slate-900 text-emerald-400 text-xs font-mono rounded-lg px-4 py-3 overflow-x-auto whitespace-pre-wrap">{entry.example}</pre>
        </div>
      )}
    </div>
  );
}

function PopularGrid() {
  const popular = POPULAR.map((type) => MIME_DB.find((e) => e.type === type)).filter(Boolean) as MimeEntry[];
  const byCategory: Partial<Record<Category, MimeEntry[]>> = {};
  for (const entry of popular) {
    if (!byCategory[entry.category]) byCategory[entry.category] = [];
    byCategory[entry.category]!.push(entry);
  }

  return (
    <div class="space-y-4">
      <p class="text-xs font-semibold text-slate-400 uppercase tracking-widest">Popular types</p>
      <div class="flex flex-wrap gap-2">
        {popular.map((entry) => {
          const { dot } = CATEGORY_STYLES[entry.category];
          return (
            <a
              href={`/?q=${encodeURIComponent(entry.type)}`}
              class="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            >
              <span class={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
              <code class="font-mono text-xs text-slate-700">{entry.type}</code>
            </a>
          );
        })}
      </div>
    </div>
  );
}

app.get("/", (c) => {
  const q = c.req.query("q") ?? "";
  const results = q ? search(q) : [];

  return c.html(
    <Layout title={q || undefined}>
      <div class="max-w-2xl mx-auto px-4 py-12">
        <div class="mb-8">
          <h1 class="text-2xl font-bold tracking-tight">mimecheck</h1>
          <p class="text-slate-500 mt-1 text-sm">
            Look up any MIME type or file extension — description, usage, and examples.
          </p>
        </div>

        <form method="GET" action="/" class="flex gap-2 mb-8">
          <input
            type="text"
            name="q"
            value={q}
            placeholder="e.g. image/webp or .svg or woff2"
            spellcheck="false"
            autocomplete="off"
            class="flex-1 font-mono bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-slate-400"
          />
          <button
            type="submit"
            class="px-5 py-3 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Look up
          </button>
        </form>

        {!q && <PopularGrid />}

        {q && results.length === 0 && (
          <div class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-6 text-center">
            <p class="text-slate-500 text-sm">No results for <code class="font-mono">{q}</code>.</p>
            <p class="text-slate-400 text-xs mt-1">Try a MIME type like <code class="font-mono">image/webp</code> or extension like <code class="font-mono">.svg</code></p>
          </div>
        )}

        {results.length > 0 && (
          <div class="space-y-4">
            {results.length > 1 && (
              <p class="text-xs text-slate-400">{results.length} results</p>
            )}
            {results.map((entry) => <MimeCard entry={entry} />)}
          </div>
        )}

        <footer class="mt-16 pt-6 border-t border-slate-100">
          <p class="text-xs text-slate-400">
            Made by{" "}
            <a href="https://github.com/srmdn" class="underline hover:text-slate-600">
              srmdn
            </a>
            .
          </p>
        </footer>
      </div>
    </Layout>
  );
});

export default {
  port: 3000,
  fetch: app.fetch,
};
