# mimecheck

Look up any MIME type or file extension — description, usage, and examples.

![mimecheck screenshot](screenshot.png)

## What it does

- Search by MIME type (`image/webp`), file extension (`.svg`, `woff2`), or keyword
- Full description — what the format is, when to use it
- Browser support and gotchas
- Copy-ready usage examples (HTML, CSS, HTTP headers)
- 50+ common MIME types across image, video, audio, text, application, font
- Popular types grid on the landing page for quick browsing

## Stack

- **Runtime** — [Bun](https://bun.sh)
- **Framework** — [Hono](https://hono.dev) with JSX SSR
- **Styling** — Tailwind CSS (CDN)

## Run locally

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

MIT
