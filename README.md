# Artist Portfolio

A multi-page portfolio and sales site built with React and Vite, ready to deploy on GitHub Pages.

## Pages

- **Home** — hero section and featured work
- **Gallery** — artwork grid with placeholders
- **Contact** — enquiry form and contact details

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173/digillama/](http://localhost:5173/digillama/) to preview locally.

## Customisation

Edit the theme section at the top of `src/index.css` to change colours and fonts. Replace placeholder content in the page components with the artist's details and images.

If the GitHub repository name differs from `digillama`, update the `base` option in `vite.config.js` to match (`/your-repo-name/`).

## Deploy to GitHub Pages

Deployment is handled automatically by GitHub Actions on every push to `main`.

1. Push this repository to GitHub.
2. In the repository **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**.
3. Push to `main` (or trigger the workflow manually under **Actions → Deploy to GitHub Pages → Run workflow**).
4. The site will be live at `https://<username>.github.io/digillama/`.
