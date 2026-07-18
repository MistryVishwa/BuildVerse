# Expense Splitter

A premium browser-based group expense calculator that splits bills fairly and generates a minimum-transaction settlement plan. Zero dependencies, zero build steps — just open `index.html`.

## Features

### 👥 Participants
- Add any number of participants with unique color-coded avatars
- Quick-start presets (3 friends, 4 roommates, 6 travelers)
- Remove participants with automatic expense cleanup

### 🧾 Expense Logging
- Add expenses with description, amount, category, date, and payer
- Edit or delete any expense at any time
- 8 category icons (Food, Accommodation, Transport, Entertainment, Shopping, Travel, Health, Other)

### ⚖️ Split Modes
- **Equal Split** — divides amount evenly, shows per-person share in real time
- **Percentage Split** — assign custom percentages per person (validates total = 100%)
- **Custom Split** — enter exact amounts per person (validates sum = total)

### 📊 Summary
- Total spent, expense count, per-person average
- Balance cards per participant showing who gets back / owes / is settled
- Category breakdown with animated progress bars
- Export, copy, and print report

### 💳 Settle Up
- Greedy debt simplification algorithm — minimum number of transactions to settle all debts
- Clear visual flow: who pays whom and how much

### 🌐 Other Features
- **Multi-currency** — USD, EUR, GBP, INR, JPY, KRW, AUD, CAD
- **Dark / Light mode** toggle (persisted to `localStorage`)
- **Session persistence** — all data saved to `localStorage`
- **CSV export** — full expense table with per-person splits
- **Copy report** — clipboard-ready plain-text summary
- **Print** support

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JavaScript
- Google Fonts (Outfit, JetBrains Mono)
- No frameworks, no dependencies, no build step

## Run Locally

Open `index.html` directly in any modern browser. No server required.
