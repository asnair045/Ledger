# Ledger

A minimal, dependency-free task list

## Features
- Add, check off, and delete items
- Filter by All / Open / Done
- Clear done items in one click
- Zero dependencies — works offline, deployable anywhere static files are served

## Run locally
Open `index.html` in any browser. That's it.

## Deploy on GitHub Pages
1. Push this repo to GitHub (steps below).
2. Repo **Settings → Pages**.
3. Source: **Deploy from a branch** → branch `main` → folder `/root`.
4. Live in a minute or two at `https://<username>.github.io/<repo-name>/`.

## Project structure
```
├── index.html   # markup
├── styles.css   # styling (design tokens at the top)
├── app.js       # logic + localStorage persistence
└── README.md
```

## Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Ledger starter"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

## Extending this starter
- Swap `localStorage` for a real backend (Node/Express + a database) once you need multi-device sync
- Add due dates, tags, or drag-to-reorder
- Introduce a bundler (Vite) only once the project outgrows a few files
