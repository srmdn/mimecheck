export type Category = "image" | "video" | "audio" | "text" | "application" | "font" | "multipart";

export interface MimeEntry {
  type: string;
  name: string;
  category: Category;
  extensions: string[];
  description: string;
  notes?: string;
  example?: string;
}

export const MIME_DB: MimeEntry[] = [
  // Images
  {
    type: "image/jpeg",
    name: "JPEG Image",
    category: "image",
    extensions: [".jpg", ".jpeg"],
    description: "Lossy compressed raster image format. Best for photographs and complex images with gradients.",
    notes: "Supported by all browsers. Does not support transparency — use PNG or WebP for that.",
    example: '<img src="photo.jpg" alt="...">\nbackground-image: url("photo.jpg");',
  },
  {
    type: "image/png",
    name: "PNG Image",
    category: "image",
    extensions: [".png"],
    description: "Lossless raster image format with full transparency support. Best for logos, icons, and UI elements.",
    notes: "Supported by all browsers. Larger file size than JPEG for photos — use WebP where possible.",
    example: '<img src="logo.png" alt="Logo">',
  },
  {
    type: "image/webp",
    name: "WebP Image",
    category: "image",
    extensions: [".webp"],
    description: "Modern image format with both lossy and lossless modes. 25–35% smaller than JPEG/PNG at equivalent quality.",
    notes: "Supported by all modern browsers (Chrome 32+, Firefox 65+, Safari 14+). Use with <picture> fallback for older browsers.",
    example: '<picture>\n  <source srcset="image.webp" type="image/webp">\n  <img src="image.jpg" alt="...">\n</picture>',
  },
  {
    type: "image/avif",
    name: "AVIF Image",
    category: "image",
    extensions: [".avif"],
    description: "Next-gen image format based on AV1 video codec. Up to 50% smaller than JPEG with better quality.",
    notes: "Chrome 85+, Firefox 93+, Safari 16+. Encoding is slow — best used for pre-compressed assets.",
    example: '<picture>\n  <source srcset="image.avif" type="image/avif">\n  <source srcset="image.webp" type="image/webp">\n  <img src="image.jpg" alt="...">\n</picture>',
  },
  {
    type: "image/svg+xml",
    name: "SVG Image",
    category: "image",
    extensions: [".svg"],
    description: "XML-based vector image format. Resolution-independent — looks sharp at any size. Ideal for icons, logos, and illustrations.",
    notes: "All modern browsers. Can be inlined in HTML, used in CSS, or referenced in <img>. Be careful with SVGs from untrusted sources — they can contain JavaScript.",
    example: '<img src="icon.svg" alt="Icon">\n<!-- or inline: -->\n<svg xmlns="http://www.w3.org/2000/svg">...</svg>',
  },
  {
    type: "image/gif",
    name: "GIF Image",
    category: "image",
    extensions: [".gif"],
    description: "Lossless image format limited to 256 colors. Supports animation and transparency. Largely superseded by WebP and APNG for animations.",
    notes: "Use <video> or WebP for animations — GIFs are much larger and lower quality.",
    example: '<img src="animation.gif" alt="Animation">',
  },
  {
    type: "image/apng",
    name: "Animated PNG",
    category: "image",
    extensions: [".apng", ".png"],
    description: "Extension of PNG that supports animation with full color depth and transparency. Better than GIF for animated images.",
    notes: "Chrome 59+, Firefox 3+, Safari 8+. Not supported in IE. Works anywhere <img> does.",
  },
  {
    type: "image/x-icon",
    name: "ICO Icon",
    category: "image",
    extensions: [".ico"],
    description: "Windows icon format containing one or more images at different sizes. Used for browser favicons.",
    notes: 'Use `<link rel="icon" href="/favicon.ico">` or prefer SVG favicons for modern browsers.',
    example: '<link rel="icon" href="/favicon.ico" sizes="any">\n<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
  },
  {
    type: "image/tiff",
    name: "TIFF Image",
    category: "image",
    extensions: [".tif", ".tiff"],
    description: "High-quality lossless image format commonly used in printing, publishing, and photography workflows.",
    notes: "Not supported natively in browsers. Used for archival and print — convert to JPEG/WebP for web delivery.",
  },
  {
    type: "image/bmp",
    name: "BMP Image",
    category: "image",
    extensions: [".bmp"],
    description: "Uncompressed raster image format from Windows. Very large file sizes with no practical advantages for the web.",
    notes: "Avoid for web use. Convert to PNG or WebP.",
  },

  // Video
  {
    type: "video/mp4",
    name: "MP4 Video",
    category: "video",
    extensions: [".mp4", ".m4v"],
    description: "The most widely supported video container format. Uses H.264 or H.265 video codec, AAC audio.",
    notes: "Supported by all browsers. Best choice for broad compatibility.",
    example: '<video controls>\n  <source src="video.mp4" type="video/mp4">\n</video>',
  },
  {
    type: "video/webm",
    name: "WebM Video",
    category: "video",
    extensions: [".webm"],
    description: "Open web video format using VP8/VP9 or AV1 video codec. Smaller file sizes than MP4.",
    notes: "Chrome, Firefox, Edge. Safari support is limited — always provide MP4 fallback.",
    example: '<video controls>\n  <source src="video.webm" type="video/webm">\n  <source src="video.mp4" type="video/mp4">\n</video>',
  },
  {
    type: "video/ogg",
    name: "OGG Video",
    category: "video",
    extensions: [".ogv", ".ogg"],
    description: "Open container format using Theora video codec. Largely superseded by WebM.",
    notes: "Firefox and Chrome. Rarely used in new projects — prefer WebM or MP4.",
  },
  {
    type: "video/quicktime",
    name: "QuickTime Video",
    category: "video",
    extensions: [".mov"],
    description: "Apple QuickTime video container. Common output format for macOS/iOS recording.",
    notes: "Native support in Safari only. Convert to MP4 for web delivery.",
  },

  // Audio
  {
    type: "audio/mpeg",
    name: "MP3 Audio",
    category: "audio",
    extensions: [".mp3"],
    description: "Most widely used audio format. Lossy compression with excellent compatibility.",
    notes: "Supported by all browsers.",
    example: '<audio controls>\n  <source src="audio.mp3" type="audio/mpeg">\n</audio>',
  },
  {
    type: "audio/ogg",
    name: "OGG Audio",
    category: "audio",
    extensions: [".ogg", ".oga"],
    description: "Open audio format using the Vorbis or Opus codec. Good quality at low bitrates.",
    notes: "Chrome, Firefox. No native Safari support — provide MP3 fallback.",
  },
  {
    type: "audio/wav",
    name: "WAV Audio",
    category: "audio",
    extensions: [".wav"],
    description: "Uncompressed audio format. Lossless but very large file sizes. Used in audio production.",
    notes: "All browsers. Avoid for web streaming due to file size — use MP3 or OGG.",
  },
  {
    type: "audio/aac",
    name: "AAC Audio",
    category: "audio",
    extensions: [".aac", ".m4a"],
    description: "Advanced Audio Coding. Better quality than MP3 at the same bitrate. Default format for iTunes and Apple devices.",
    notes: "All modern browsers. Common alternative to MP3.",
  },
  {
    type: "audio/webm",
    name: "WebM Audio",
    category: "audio",
    extensions: [".weba"],
    description: "WebM container with Opus audio codec. Excellent quality at very low bitrates.",
    notes: "Chrome, Firefox. Limited Safari support.",
  },
  {
    type: "audio/flac",
    name: "FLAC Audio",
    category: "audio",
    extensions: [".flac"],
    description: "Free Lossless Audio Codec. Perfect audio quality, about half the size of WAV.",
    notes: "Chrome, Firefox, Safari. Best for archival and audiophile use cases.",
  },

  // Text
  {
    type: "text/html",
    name: "HTML Document",
    category: "text",
    extensions: [".html", ".htm"],
    description: "HyperText Markup Language — the standard language for web pages.",
    notes: "Always include `; charset=utf-8` to avoid encoding issues.",
    example: "Content-Type: text/html; charset=utf-8",
  },
  {
    type: "text/css",
    name: "CSS Stylesheet",
    category: "text",
    extensions: [".css"],
    description: "Cascading Style Sheets — controls the presentation of HTML documents.",
    example: '<link rel="stylesheet" href="styles.css">',
  },
  {
    type: "text/javascript",
    name: "JavaScript",
    category: "text",
    extensions: [".js", ".mjs"],
    description: "The standard MIME type for JavaScript files. Supersedes the legacy `application/javascript`.",
    notes: "`application/javascript` is deprecated — use `text/javascript` per RFC 9239 (2022).",
    example: '<script src="app.js"></script>\n<script type="module" src="app.mjs"></script>',
  },
  {
    type: "text/plain",
    name: "Plain Text",
    category: "text",
    extensions: [".txt"],
    description: "Unformatted plain text. Displayed as-is in the browser.",
    notes: "Browsers will render this in a monospace font. Include charset to avoid encoding issues.",
  },
  {
    type: "text/csv",
    name: "CSV",
    category: "text",
    extensions: [".csv"],
    description: "Comma-Separated Values. Tabular data in plain text format.",
    notes: 'Triggers a download in most browsers. Use `Content-Disposition: attachment` to be explicit.',
  },
  {
    type: "text/xml",
    name: "XML (text)",
    category: "text",
    extensions: [".xml"],
    description: "eXtensible Markup Language as a text document. Browsers render it as a tree view.",
    notes: "Prefer `application/xml` for machine-consumed XML. Use `text/xml` when the content is human-readable.",
  },
  {
    type: "text/calendar",
    name: "iCalendar",
    category: "text",
    extensions: [".ics"],
    description: "Calendar data format (events, tasks). Opened by calendar apps like Google Calendar, Apple Calendar, Outlook.",
    example: 'Content-Disposition: attachment; filename="event.ics"\nContent-Type: text/calendar',
  },
  {
    type: "text/markdown",
    name: "Markdown",
    category: "text",
    extensions: [".md", ".markdown"],
    description: "Lightweight markup language. Not rendered natively by browsers — served as plain text.",
    notes: "Not an official IANA standard but widely accepted. Some servers use `text/plain` instead.",
  },

  // Application
  {
    type: "application/json",
    name: "JSON",
    category: "application",
    extensions: [".json"],
    description: "JavaScript Object Notation. The most common format for REST API responses and config files.",
    notes: "Include `; charset=utf-8`. Browsers pretty-print it with extensions like JSON Viewer.",
    example: "fetch('/api/data', {\n  headers: { 'Content-Type': 'application/json' }\n})",
  },
  {
    type: "application/xml",
    name: "XML",
    category: "application",
    extensions: [".xml"],
    description: "eXtensible Markup Language for structured machine-readable data.",
    notes: "Use for APIs and data exchange. Use `text/xml` if the content is intended to be read by humans.",
  },
  {
    type: "application/pdf",
    name: "PDF Document",
    category: "application",
    extensions: [".pdf"],
    description: "Portable Document Format. Rendered inline by most browsers using their built-in PDF viewer.",
    notes: 'Use `Content-Disposition: attachment` to force download instead of inline display.',
    example: "Content-Type: application/pdf\nContent-Disposition: inline",
  },
  {
    type: "application/zip",
    name: "ZIP Archive",
    category: "application",
    extensions: [".zip"],
    description: "Compressed archive format. Always triggers a download in browsers.",
    example: 'Content-Disposition: attachment; filename="archive.zip"',
  },
  {
    type: "application/gzip",
    name: "GZIP Archive",
    category: "application",
    extensions: [".gz", ".gzip"],
    description: "GZIP compressed file. Not to be confused with `Content-Encoding: gzip` which is transparent compression.",
    notes: "As a file download, use `application/gzip`. As HTTP transfer encoding, use the `Content-Encoding` header.",
  },
  {
    type: "application/octet-stream",
    name: "Binary Data",
    category: "application",
    extensions: [],
    description: "Generic binary data — the fallback MIME type when the actual type is unknown. Browsers will always prompt a download.",
    notes: "Use the specific MIME type when known. `application/octet-stream` is a last resort.",
  },
  {
    type: "application/wasm",
    name: "WebAssembly",
    category: "application",
    extensions: [".wasm"],
    description: "Compiled WebAssembly binary. Runs near-native speed in the browser alongside JavaScript.",
    notes: "Servers must send the correct MIME type — many serve `.wasm` as `application/octet-stream` which can break some use cases.",
    example: "WebAssembly.instantiateStreaming(fetch('module.wasm'))",
  },
  {
    type: "application/x-www-form-urlencoded",
    name: "URL-Encoded Form",
    category: "application",
    extensions: [],
    description: "Default encoding for HTML form submissions. Key-value pairs encoded like URL query strings (`key=value&key2=value2`).",
    notes: "Cannot upload files — use `multipart/form-data` for file uploads.",
    example: '<form method="POST" action="/submit">\n  <!-- default encoding -->\n</form>',
  },
  {
    type: "application/ld+json",
    name: "JSON-LD",
    category: "application",
    extensions: [".jsonld"],
    description: "JSON for Linked Data. Used for structured data markup (Schema.org) understood by Google Search and other crawlers.",
    example: '<script type="application/ld+json">\n{ "@context": "https://schema.org", "@type": "Article" }\n</script>',
  },
  {
    type: "application/manifest+json",
    name: "Web App Manifest",
    category: "application",
    extensions: [".webmanifest"],
    description: "Progressive Web App manifest. Defines the app name, icons, colors, and display mode for installable web apps.",
    example: '<link rel="manifest" href="/manifest.webmanifest">',
  },
  {
    type: "application/rss+xml",
    name: "RSS Feed",
    category: "application",
    extensions: [".rss", ".xml"],
    description: "Really Simple Syndication. XML-based format for publishing frequently updated content like blog posts.",
    example: '<link rel="alternate" type="application/rss+xml" href="/feed.rss">',
  },
  {
    type: "application/atom+xml",
    name: "Atom Feed",
    category: "application",
    extensions: [".atom", ".xml"],
    description: "Atom Syndication Format. Alternative to RSS, more standardized and expressive.",
    example: '<link rel="alternate" type="application/atom+xml" href="/feed.atom">',
  },

  // Font
  {
    type: "font/woff2",
    name: "WOFF2 Font",
    category: "font",
    extensions: [".woff2"],
    description: "Web Open Font Format 2 — the best format for web fonts. Uses Brotli compression, 30% smaller than WOFF.",
    notes: "All modern browsers. This should be your primary web font format.",
    example: '@font-face {\n  font-family: "MyFont";\n  src: url("font.woff2") format("woff2");\n}',
  },
  {
    type: "font/woff",
    name: "WOFF Font",
    category: "font",
    extensions: [".woff"],
    description: "Web Open Font Format — compressed font format for the web. Legacy fallback for WOFF2.",
    notes: "Include as a fallback for older browsers that don't support WOFF2. IE9+ supports it.",
    example: '@font-face {\n  font-family: "MyFont";\n  src: url("font.woff2") format("woff2"),\n       url("font.woff") format("woff");\n}',
  },
  {
    type: "font/ttf",
    name: "TrueType Font",
    category: "font",
    extensions: [".ttf"],
    description: "TrueType Font — desktop font format, larger than WOFF/WOFF2. Legacy web font fallback.",
    notes: "Prefer WOFF2 for the web. TTF is mainly for desktop applications.",
  },
  {
    type: "font/otf",
    name: "OpenType Font",
    category: "font",
    extensions: [".otf"],
    description: "OpenType Font — extended TrueType with advanced typographic features. Desktop format.",
    notes: "Prefer WOFF2 for web delivery.",
  },

  // Multipart
  {
    type: "multipart/form-data",
    name: "Multipart Form Data",
    category: "multipart",
    extensions: [],
    description: "Encoding for HTML forms that upload files. Each field is sent as a separate part with its own headers.",
    notes: "The `boundary` parameter is required and auto-generated by the browser. Never set this header manually when using fetch FormData.",
    example: '<form method="POST" enctype="multipart/form-data">\n  <input type="file" name="upload">\n</form>',
  },
];

export function search(query: string): MimeEntry[] {
  const q = query.trim().toLowerCase().replace(/^\./, "");
  if (!q) return [];

  const scored = MIME_DB.map((entry) => {
    let score = 0;
    const type = entry.type.toLowerCase();
    const exts = entry.extensions.map((e) => e.replace(".", ""));

    if (type === q || type === `${q}`) score = 100;
    else if (exts.includes(q)) score = 90;
    else if (type.includes(q)) score = 60;
    else if (exts.some((e) => e.includes(q))) score = 50;
    else if (entry.name.toLowerCase().includes(q)) score = 30;
    else if (entry.description.toLowerCase().includes(q)) score = 10;

    return { entry, score };
  });

  return scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.entry);
}

export const POPULAR = [
  "image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/avif",
  "application/json", "text/html", "text/css", "text/javascript",
  "video/mp4", "audio/mpeg", "application/pdf",
  "font/woff2", "application/zip", "application/octet-stream",
];
