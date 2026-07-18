# Password Strength Analyzer

A real-time, interactive password security tool built with pure HTML, CSS, and JavaScript — zero dependencies, zero build steps.

## Features

### 🔍 Live Analysis
- **Real-time strength meter** — 5-segment visual bar updates instantly as you type
- **Entropy calculation** — measures bits of entropy based on character set pool size
- **Estimated crack time** — time at 10 billion guesses/second (GPU cluster)
- **Strength levels**: Too Weak → Weak → Fair → Good → Strong → Very Strong

### ✅ Complexity Checks
- Minimum 8 characters
- Minimum 16 characters (for strong security)
- Uppercase letters (A–Z)
- Lowercase letters (a–z)
- Numbers (0–9)
- Special symbols (!@#…)
- No excessive character repetition
- Not a common/breached password (top ~100 common passwords detected)

### 💡 Smart Suggestions
- Personalized, real-time improvement tips based on what's missing
- Detects keyboard walks (`qwerty`, `asdf`), sequential patterns (`123`, `abc`), and character-only passwords

### ⚡ Secure Password Generator
- Cryptographically secure (`window.crypto.getRandomValues`)
- Configurable length (8–64 characters)
- Toggle: Uppercase / Lowercase / Numbers / Symbols / No Ambiguous Characters
- Guarantees at least one character from each selected category

### 🛡️ Security Education
- 6 security tip cards covering passphrases, unique passwords, 2FA, managers, and breach monitoring

### 🕓 Analyzed History
- Tracks up to 8 recent analyses with masked display, length, and strength badge
- Persists during the session

### 🎨 UX Polish
- **Dark / Light mode** toggle (persisted to `localStorage`)
- **Password visibility toggle** (show/hide)
- **One-click copy** with tooltip confirmation
- **"Use" button** — send generated password to the analyzer instantly
- Animated background orbs, glassmorphism cards, smooth transitions

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JavaScript
- Google Fonts (Outfit, JetBrains Mono)
- `window.crypto.getRandomValues` for cryptographic randomness
- No frameworks, no dependencies, no build step

## Run Locally

Open `index.html` directly in any modern browser.
