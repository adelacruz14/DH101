# DH101 — Local Site

This lightweight site was added to the repository root for a quick local preview. Files created:

- `index.html` — site entry
- `assets/css/style.css` — styles used by the site

Key section:
- **My Reflection** — a short reflection block on the front page linking to `reflections/week01.md`.

To preview locally (simple HTTP server), run from the repository root:

For Python 3:

```powershell
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or open `index.html` directly in your browser. The site links to repository markdown files under `pages/`, `makes/`, and `reflections/`.
