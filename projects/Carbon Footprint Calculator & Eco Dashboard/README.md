# Carbon Footprint Calculator & Eco Dashboard

A high-performance, premium, and fully accessible single-page web dashboard to calculate, log, and visualize personal carbon footprints using realistic emission coefficients. Built with pure vanilla frontend technologies, featuring glassmorphism design layouts, light/dark themes, and real-time interactive analytics.

---

## Features

- **Multi-Category Carbon Calculator:** Custom step-by-step forms with validations covering:
  - **Transportation:** Mileage logs for private cars, motorcycles, bus transits, trains/metro systems, and hours spent on flights.
  - **Energy Consumption:** Household electricity (kWh), cooking LPG cylinders (kg), air conditioner run-times (hours), and daily water utility (liters).
  - **Dietary Footprint:** Weekly meals counts (Vegetarian, Non-Vegetarian) and portion logs for dairy/egg products.
  - **Waste & Recycling:** Weight of plastics/paper trashed alongside offsetting inputs for sorted recycling and composted organic matter.
- **Dynamic Eco Score Widget:** A circular dashboard progress ring displaying an overall score from `0` to `100` (Excellent, Good, Average, Needs Improvement) using real-time animated transitions.
- **Interactive Visual Analytics:** Powered by `Chart.js` via CDN:
  - **Category Breakdown (Doughnut):** Real-time proportional split of carbon impact.
  - **Detailed Sources (Bar):** Visual comparison of individual contributors, featuring positive emission bars and negative green offset indicators (recycling/composting).
  - **Trend Analysis (Line):** Chronological monthly progression of total emissions and Eco Scores.
- **Tailored Recommendations:** Auto-generated action lists targeting highest-impact emission categories (e.g. suggesting meatless days, solar utility, public transport, or bin sorting).
- **Monthly History Ledger:** Persistent storage for logging data. Includes options to export complete history logs as JSON and perform master database resets.
- **Dark/Light Theme Toggle:** Fluid theme-shifting system using modern CSS design tokens.
- **Accessibility Compliant:** Built using semantic HTML5 elements, correct keyboard focus handling, `aria-live` alert regions, and high color-contrast ratio.

---

## Folder Structure

```text
projects/Carbon Footprint Calculator & Eco Dashboard/
├── index.html          # HTML structure, layouts, form markup & CDN links
├── style.css           # Global theme variables, layouts, animations & typography
├── script.js          # Core engine, calculations, localstorage sync & chart managers
├── README.md           # Extensive project documentations (this file)
├── project.json        # BuildVerse project registration metadata
└── assets/
    ├── icons/          # Visual interface icons & markers
    ├── images/         # Static illustrative graphics
    └── screenshots/    # Project demo screenshots placeholders
```

---

## Technologies Used

- **HTML5:** Semantic architecture for layout, form groups, and accessibility.
- **CSS3:** Modern design styling utilizing variables, glassmorphic filters, responsive flex/grid layouts, and micro-animations.
- **Vanilla JavaScript (ES6):** State binding, calculations, debouncing, and localstorage operations.
- **Chart.js (CDN):** Fast canvas-based data visualizations.
- **Google Fonts:** `Outfit` (display) and `Inter` (body text) fonts.

---

## Installation & Running

This project is completely serverless and runs directly in browser environments without needing build tools or package managers.

1. Clone or download the BuildVerse repository.
2. Locate the project folder:
   `projects/Carbon Footprint Calculator & Eco Dashboard/`
3. Double-click `index.html` or open it with any modern browser (Chrome, Edge, Firefox, Safari) to launch the app.
4. (Optional) Run a local server for testing via standard IDE extensions like Live Server, or run `npm run dev` at the root workspace directory.

---

## Carbon Calculation Methodology

Emissions are calculated in kilograms of Carbon Dioxide equivalents (kg CO₂e) per month using standard public metrics:

### 1. Transportation
- **Private Car:** `Distance (km) * 0.18 kg CO₂e`
- **Motorcycle/Bike:** `Distance (km) * 0.02 kg CO₂e`
- **Bus Transit:** `Distance (km) * 0.08 kg CO₂e`
- **Train/Metro:** `Distance (km) * 0.04 kg CO₂e`
- **Flight Time:** `Hours * 150.00 kg CO₂e`

### 2. Energy
- **Grid Electricity:** `kWh * 0.45 kg CO₂e`
- **LPG Cooking Gas:** `kg * 2.98 kg CO₂e`
- **Air Conditioning:** `Hours * 0.80 kg CO₂e`
- **Water Consumption:** `Liters/day * 30 days * 0.0003 kg CO₂e`

### 3. Food (Weekly portions scaled to Monthly using factor 4.33)
- **Vegetarian Meals:** `Meals/week * 1.50 kg CO₂e * 4.33`
- **Non-Vegetarian Meals:** `Meals/week * 6.00 kg CO₂e * 4.33`
- **Dairy Portions:** `Portions/week * 0.40 kg CO₂e * 4.33`

### 4. Waste & Recycling Offsets
- **Plastic Waste:** `kg * 2.00 kg CO₂e`
- **Paper Waste:** `kg * 0.50 kg CO₂e`
- **Recycling Offset:** `- kg sorted * 0.50 kg CO₂e` (deducted credit)
- **Composting Offset:** `- kg organic composted * 0.20 kg CO₂e` (deducted credit)

*Note: Total category waste footprint is capped at a minimum of `0` to prevent excessive offsets from creating impossible negative footprints.*

### 5. Eco Score Formula
The score scales footprints from `0` to `100` relative to monthly emission limits:
$$\text{Eco Score} = \max\left(0, \min\left(100, 100 - \text{round}\left(\frac{\text{Total Monthly Emissions}}{8.0}\right)\right)\right)$$

- **Excellent (90-100):** Extremely low carbon footprint.
- **Good (70-89):** Balanced footprint with minor opportunities.
- **Average (50-69):** Moderate carbon footprint.
- **Needs Improvement (0-49):** High carbon footprint.

---

## Accessibility Compliance

- **Aria Roles:** Defined tab lists (`role="tablist"`), panel views (`role="tabpanel"`), toggles, state values (`aria-selected`), and descriptive labels (`aria-describedby`).
- **Skip Navigation:** Implemented a visible-on-focus skip link allowing screen readers to bypass headers.
- **Keyboard Navigation:** Tab panels and visual chart displays are fully navigable using arrow keys, Home, End, Tab, and Enter keys.
- **Contrast and Readability:** Contrast ratios between background panels and text elements meet WCAG AA specifications in both Light and Dark mode variations.

---

## Future Improvements

1. **Geo-located Emission Grid Factors:** Query dynamic APIs to fetch localized regional grid coefficients for electricity consumption.
2. **Detailed Food Splits:** Expand diet category forms to cover beef, dairy, pork, and local grains individually.
3. **Interactive Mini-Games:** Include gamified ecological quizzes and carbon-neutral challenges.
4. **Historical CSV Export:** Add spreadsheets export (CSV) option alongside JSON.

---

## License

This project is open-source under the MIT License - see the LICENSE file in the BuildVerse root for details.
