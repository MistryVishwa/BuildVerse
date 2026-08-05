# Smart Waste Management Platform

A standalone municipal waste management dashboard that runs purely in the browser (no backend required). Data is persisted in `localStorage` so the app works offline after first load.

## Features

- **Dashboard** — Open/resolved complaint counts, complaints-per-type bar chart, and recent complaints table
- **Report Issue** — Citizens file waste-related complaints (overflowing bins, illegal dumping, missed collection, recycling issues)
- **Complaint Management** — Mark complaints as resolved, delete stale entries, sort by status
- **Collection Schedule** — Zone-based pickup calendar (Mon/Wed/Fri for each zone)

## Usage

Open `index.html` directly in a browser. No build step, no server, no dependencies.

## Technology

Vanilla HTML + CSS + JavaScript. Data is stored in the browser's localStorage.