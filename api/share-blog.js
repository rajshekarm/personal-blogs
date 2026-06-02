const API_BASE =
  process.env.VITE_API_BASE_URL || process.env.API_BASE_URL || "http://localhost:8080/api"

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")

const stripMarkdown = (value) =>
  String(value ?? "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

const normalizeDescription = (blog) => {
  const raw = blog?.description || blog?.subheader || blog?.content || ""
  const cleaned = stripMarkdown(raw)
  if (!cleaned) {
    return "Backend engineering, distributed systems, and applied AI."
  }
  return cleaned.length > 180 ? `${cleaned.slice(0, 177)}...` : cleaned
}

const pickShareImage = (blog) => {
  const sections = Array.isArray(blog?.sections) ? blog.sections : []
  for (const section of sections) {
    if (section?.image_url) {
      return section.image_url
    }
    const children = Array.isArray(section?.children) ? section.children : []
    for (const child of children) {
      if (child?.image_url) {
        return child.image_url
      }
    }
  }

  return "https://rajashekarmudigonda.space/profile.png"
}

const renderSharePage = (blog, shareUrl) => {
  const title = `${blog.title} | Rajashekar Mudigonda`
  const description = normalizeDescription(blog)
  const image = pickShareImage(blog)
  const safeTitle = escapeHtml(title)
  const safeDescription = escapeHtml(description)
  const safeImage = escapeHtml(image)
  const safeShareUrl = escapeHtml(shareUrl)
  const safeBlogUrl = escapeHtml(`https://rajashekarmudigonda.space/blogs/${blog.slug}`)
  const tags = Array.isArray(blog.tags) ? blog.tags.filter(Boolean) : []
  const tagMarkup = tags
    .slice(0, 6)
    .map(
      (tag) =>
        `<span class="tag">${escapeHtml(tag)}</span>`
    )
    .join("")

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDescription}" />
    <link rel="canonical" href="${safeShareUrl}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Rajashekar Mudigonda" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:url" content="${safeShareUrl}" />
    <meta property="og:image" content="${safeImage}" />
    <meta property="og:image:alt" content="${safeTitle}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${safeImage}" />
    <meta name="theme-color" content="#0b1020" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #050816;
        --panel: rgba(8, 14, 28, 0.78);
        --panel-border: rgba(255, 255, 255, 0.1);
        --text: #f8fafc;
        --muted: #b8c2d4;
        --accent: #58d8ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background:
          radial-gradient(circle at top left, rgba(88, 216, 255, 0.12), transparent 24%),
          radial-gradient(circle at top right, rgba(168, 85, 247, 0.12), transparent 22%),
          linear-gradient(180deg, #030712, #050816 46%, #0b1020);
        color: var(--text);
      }
      .wrap {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 32px 18px;
      }
      .card {
        width: min(980px, 100%);
        border: 1px solid var(--panel-border);
        border-radius: 28px;
        background: var(--panel);
        backdrop-filter: blur(24px);
        box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
        overflow: hidden;
      }
      .hero {
        display: grid;
        grid-template-columns: minmax(0, 1.08fr) minmax(280px, 0.92fr);
        gap: 0;
      }
      .content {
        padding: 40px 40px 36px;
      }
      .eyebrow {
        font-size: 11px;
        letter-spacing: 0.32em;
        text-transform: uppercase;
        color: #9ca9c0;
      }
      h1 {
        margin: 14px 0 0;
        font-size: clamp(2rem, 4vw, 3.6rem);
        line-height: 0.98;
        letter-spacing: -0.04em;
      }
      .description {
        margin: 18px 0 0;
        font-size: 1rem;
        line-height: 1.8;
        color: var(--muted);
        max-width: 60ch;
      }
      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 24px;
      }
      .tag {
        display: inline-flex;
        align-items: center;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.05);
        color: #dbe7f3;
        padding: 7px 12px;
        border-radius: 999px;
        font-size: 12px;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 28px;
      }
      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        border-radius: 999px;
        padding: 14px 20px;
        text-decoration: none;
        font-weight: 700;
        transition: transform 160ms ease, opacity 160ms ease;
      }
      .button:hover { transform: translateY(-1px); }
      .button.primary {
        background: var(--accent);
        color: #05111d;
      }
      .button.secondary {
        border: 1px solid rgba(255, 255, 255, 0.14);
        color: var(--text);
        background: rgba(255, 255, 255, 0.05);
      }
      .preview {
        position: relative;
        min-height: 320px;
        background:
          radial-gradient(circle at top left, rgba(255,255,255,0.12), transparent 32%),
          rgba(255,255,255,0.03);
        border-left: 1px solid rgba(255, 255, 255, 0.08);
      }
      .preview img {
        width: 100%;
        height: 100%;
        min-height: 320px;
        object-fit: cover;
        display: block;
      }
      .preview .overlay {
        position: absolute;
        inset: auto 18px 18px 18px;
        padding: 14px 16px;
        border-radius: 18px;
        background: rgba(5, 8, 22, 0.68);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(18px);
      }
      .overlay p {
        margin: 0;
        font-size: 13px;
        color: #dbe7f3;
      }
      .overlay strong {
        display: block;
        margin-top: 4px;
        font-size: 16px;
      }
      .foot {
        padding: 0 40px 36px;
        color: #93a1b7;
        font-size: 13px;
      }
      @media (max-width: 860px) {
        .hero { grid-template-columns: 1fr; }
        .preview { border-left: 0; border-top: 1px solid rgba(255,255,255,0.08); }
        .content, .foot { padding-left: 22px; padding-right: 22px; }
      }
    </style>
  </head>
  <body>
    <main class="wrap">
      <article class="card">
        <div class="hero">
          <section class="content">
            <div class="eyebrow">Blog Share</div>
            <h1>${safeTitle}</h1>
            <p class="description">${safeDescription}</p>
            <div class="meta">${tagMarkup}</div>
            <div class="actions">
              <a class="button primary" href="${safeBlogUrl}">Read full article</a>
              <a class="button secondary" href="https://rajashekarmudigonda.space/">Back to portfolio</a>
            </div>
          </section>
          <aside class="preview">
            <img src="${safeImage}" alt="${safeTitle}" />
            <div class="overlay">
              <p>Shared from</p>
              <strong>Rajashekar Mudigonda | Backend Engineer</strong>
              <p style="margin-top: 6px;">Backend systems, streaming, and applied AI.</p>
            </div>
          </aside>
        </div>
        <div class="foot">
          If this preview looks good in LinkedIn, use this share URL for the feature section:
          <br />
          ${safeShareUrl}
        </div>
      </article>
    </main>
  </body>
</html>`
}

export default async function handler(req, res) {
  const slug = req.query?.slug

  if (typeof slug !== "string" || !slug.trim()) {
    res.statusCode = 400
    res.setHeader("Content-Type", "text/plain; charset=utf-8")
    res.end("Missing blog slug")
    return
  }

  try {
    const blogRes = await fetch(`${API_BASE}/blogs/${encodeURIComponent(slug)}`)
    if (!blogRes.ok) {
      res.statusCode = 404
      res.setHeader("Content-Type", "text/plain; charset=utf-8")
      res.end("Blog not found")
      return
    }

    const blog = await blogRes.json()
    const shareUrl = `https://rajashekarmudigonda.space/share/blogs/${encodeURIComponent(slug)}`
    const html = renderSharePage(blog, shareUrl)

    res.statusCode = 200
    res.setHeader("Content-Type", "text/html; charset=utf-8")
    res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300")
    res.end(html)
  } catch (error) {
    res.statusCode = 500
    res.setHeader("Content-Type", "text/plain; charset=utf-8")
    res.end("Failed to generate blog share page")
  }
}
