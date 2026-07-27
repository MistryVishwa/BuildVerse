# AI Interview Preparation Platform

A browser-based mock-interview preparation platform. Pick a track (coding, HR, behavioral, system design), answer a curated question bank, get heuristic-driven "AI" feedback that scores your response on key interview dimensions — depth, structure, technical merit, STAR method compliance — and tracks your progress over multiple rounds.

## Features

- **Mock Interview** — pick a track, walk through 5 randomized questions one at a time, end with a scorecard; or run a single-question practice session.
- **Coding Questions** — 12 curated problems spanning arrays, strings, trees, dynamic programming, and bit manipulation — each with a sample solution phrasing and a clear "expected keywords" rubric per topic.
- **HR Questions** — 10 questions covering "Tell me about yourself" through "Describe a conflict" through "Why us" — each rubric scoring on STAR method, length, specificity.
- **AI Feedback** — deterministic offline rubric engine that scores responses on 4 dimensions, highlights missing keywords, and emits a per-question coaching note. No external API keys or rate limits.
- **Progress Tracking** — every practiced question is logged to `localStorage` with the score breakdown, so the dashboard shows topic-by-topic trends and a Personal Best per question.

## Built with

HTML, CSS, and vanilla JavaScript (single file). No build step, no backend. `localStorage` for persistence. Question bank is inlined as a frozen array (easy to extend).
