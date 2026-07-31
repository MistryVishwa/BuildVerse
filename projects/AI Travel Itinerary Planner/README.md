# Vagabond &mdash; AI Travel Itinerary Planner

**Vagabond** is a premium, feature-rich, and fully client-side static web application designed to help travelers plan their vacations effortlessly. With custom destinations, dynamic itinerary timelines, responsive design themes, packing checklists, and interactive budget estimators, it provides a seamless user experience that runs directly in the browser.

## Features

- **Personalized Itinerary Generator**: Builds tailored day-by-day morning, midday, and night activities based on travel interests, vacation style, and duration.
- **Curated Attractions Database**: Features rich localized recommendations, estimated costs, and expert tips for popular destinations (Paris, Tokyo, New York, London, Dubai, Singapore, Bali, Goa).
- **Universal Custom Destination Engine**: Gracefully handles any custom destination with dynamic layout structures and custom fallback suggestions.
- **Budget Estimator Dashboard**: Displays granular accommodation, dining, transportation, and activity cost breakdowns visualized with progress bars and an animated circular utilization gauge.
- **Dynamic Packing Checklist**: Automatically generates categories of packing checklists based on destination, season, and travel style. Items can be checked off and persist in LocalStorage.
- **Saved Trips Log**: LocalStorage-backed trip directory allowing users to save, delete, reload, and clear their vacation itineraries.
- **Adaptive Light/Dark Themes**: Modern aesthetics utilizing glassmorphism panels, soft glowing gradients, smooth micro-interactions, and theme persistence.
- **Accessibility & Responsive Layouts**: Built using semantic HTML5, high-contrast text ratios, visible focus styling, keyboard-friendly navigation, and adaptive layouts for all viewports (from 320px to 1440px+).

## Technologies

- **HTML5**: Semantic tags, accessible layout forms, and ARIA attributes.
- **CSS3 Variables**: Custom themes, media queries, grid structures, and backdrop filters.
- **Vanilla JavaScript (ES6)**: State management, local storage manipulation, animated counters, and DOM rendering.
- **Lucide Icons**: Modern vector icon support.
- **Google Fonts**: Inter (body text) and Outfit (display titles).

## Folder Structure

```text
projects/
└── AI Travel Itinerary Planner/
    ├── index.html
    ├── style.css
    ├── script.js
    ├── README.md
    ├── project.json
    └── assets/
        ├── images/
        ├── icons/
        └── screenshots/
```

## Installation

This is a standalone static web application that does not require any backend services or npm package installs.

1. Clone or download the BuildVerse repository.
2. Locate the project directory: `projects/AI Travel Itinerary Planner/`.
3. Open `index.html` in any web browser (Chrome, Safari, Firefox, Edge, etc.) to run the application instantly.

## Usage

1. **Select Destination**: Choose a curated city from the dropdown list, or choose "Custom Destination" and write in your preferred city.
2. **Configure Details**: Input the trip duration (1-30 days), start date, and total budget.
3. **Customize Style**: Select your travel style (Solo, Couple, Family, etc.), preferred transport type, accommodation tier, and checkboxes matching your personal interests (Nature, Food, Photography, etc.).
4. **Generate**: Click **Generate Itinerary** to animate the stats dashboard, load the weather forecast, display local attractions, generate the packing list, and inject the daily timeline nodes.
5. **Interact**: Check off items in the checklist, toggle day cards to view slot schedules, and see if your estimated cost fits inside your circle budget gauge.
6. **Save & Reload**: Click **Save Itinerary** to store it in local storage. Scroll to the bottom to view, reload, or delete past planned trips.

## Screenshots

*(Screenshots will be captured and placed inside the `assets/screenshots/` folder)*

## Future Enhancements

- **Interactive Map Routing**: Embed OpenStreetMap nodes to show optimal travel paths between morning and afternoon activities.
- **Live APIs**: Integrate live weather forecast APIs and real-time exchange rate calculators.
- **Export to PDF**: Allow users to download a beautifully styled PDF brochure of their itinerary and packing checklist.

## License

This project is licensed under the MIT License - see the main repository license details.
