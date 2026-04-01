import { escapeHtml } from "./html"

export function renderPage(title: string, body: string): string {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
      body { font-family: Georgia, serif; margin: 2rem auto; max-width: 720px; line-height: 1.5; padding: 0 1rem; }
      form { display: grid; gap: 0.75rem; margin: 1rem 0; }
      input, textarea, button, select { font: inherit; padding: 0.6rem; }
      .card { border: 1px solid #d4d4d4; border-radius: 10px; padding: 1rem; margin: 1rem 0; }
    </style>
  </head>
  <body>
    ${body}
  </body>
</html>`
}
