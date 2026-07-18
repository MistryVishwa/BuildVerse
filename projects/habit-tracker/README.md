# Habit Tracker

A modern, visually engaging habit tracker built with pure HTML, CSS, and Vanilla JavaScript. No dependencies, no build step — open `index.html` in any modern browser and start building better habits.

## Features

### 🏠 Today View
- **Progress ring** — animated circular indicator showing today's completion percentage
- **Time-aware greeting** — changes between morning / afternoon / evening
- **Habit checklist** — satisfying checkmark animation when completing a habit
- **Smart sorting** — incomplete habits first, sorted by priority (High → Low)
- **Current streak badges** — 🔥 streak counter per habit
- **All-done celebration** — banner when all habits for the day are complete

### 📋 Habit Management
- **Create unlimited habits** with:
  - Custom emoji icon (30 options)
  - Custom color (15 curated colors)
  - Category (10 built-in options)
  - Priority level (Low / Medium / High)
  - Frequency (Daily / Weekly / Monthly)
  - Optional description
- **Edit** existing habits at any time
- **Archive** habits you've completed or paused (preserves history)
- **Delete** habits (with confirmation)
- **Filter by category** — tabs update dynamically

### 📊 Analytics
- **4 overview stats** — Total completions, best streak, 30-day rate, active habits
- **GitHub-style activity heatmap** — 16-week grid showing daily completion intensity
- **Per-habit stats** — 30-day completion rate bar, current streak, longest streak, total completions

### 🏆 Achievement System (12 Badges)
| Badge | Requirement |
|---|---|
| 🌱 First Step | Complete 1 habit |
| 🔥 On Fire | 3-day streak |
| ⚡ Week Warrior | 7-day streak |
| 🌙 Fortnight | 14-day streak |
| 👑 Month Master | 30-day streak |
| 💯 Centurion | 100 total completions |
| ⭐ Perfect Day | All habits done in one day |
| 🏗️ Habit Builder | 5 active habits |
| 🎯 Dedicated | 50 total completions |
| 📈 Consistent | 80%+ rate over 30 days |
| 🦄 Legend | 100-day streak |
| 🏆 Habit Master | 10 active habits |

- **Progress bars** on locked achievements show how close you are
- **Toast notifications** when a badge is unlocked

### 🎨 UX Polish
- **Dark / Light mode** toggle (persisted to `localStorage`)
- **Session persistence** — all data saved to `localStorage`, survives page refresh
- **Bottom navigation** — mobile-friendly tab bar
- **Slide-in animations** on habit rows
- **Responsive** — works on mobile and desktop

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JavaScript
- Google Fonts (Outfit, JetBrains Mono)
- No frameworks, no dependencies, no build step

## Run Locally

Open `index.html` directly in any modern browser. No server required.
