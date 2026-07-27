# Student Skill Tracker

A browser-based centralized student portfolio for skills, achievements, and certifications, with a built-in community leaderboard and GitHub shorthand to anchor "Repositories: N" badges from public profiles. All client-side, persisted to `localStorage`.

## Features

- **Skill Graph** — skills follow a directed acyclic graph (parent → child). Add a root like "Web Dev", nest "Frontend", then "React" under it; the visualization is a nested tree with depth badges so interviewers see breadth & depth at a glance.
- **Certificates** — for each skill, pin a certificate (title, issuer, date, optional URL). Certificates appear with a verified icon if a URL is provided.
- **GitHub Integration** — put a GitHub username on your profile; the Tracker shows a "Repositories: N" badge fetched from the GitHub public API (`https://api.github.com/users/<user>`) plus a deep-link to your profile. Falls back gracefully when offline or rate-limited.
- **Leaderboard** — pre-seeded with 5 friend profiles so the local student isn't alone at first; the user's own entry sits at the top. Score per student = (skills + certificates + ⌊repos / 4⌋), persisted locally so first-place can drag-claim.

## Built with

HTML, CSS, and vanilla JavaScript (single file). Uses `fetch` against `api.github.com` (no auth token — public read-only; will hit GitHub's rate limit after ~60 unauthenticated calls/hour). `localStorage` persistence.
