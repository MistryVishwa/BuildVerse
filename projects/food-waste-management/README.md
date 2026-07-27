# Food Waste Management

Restaurants throw away excess food while many people go hungry. This app closes that gap — restaurants post surplus food, NGOs claim and pick it up, and everyone stays updated in real time. Built with pure HTML, CSS, and Vanilla JavaScript — no dependencies, no build step.

## Features

### 🏬 Restaurant Registration
- Register a restaurant with name, city, address, phone, email, and cuisine type
- Switch between multiple registered restaurants ("Act as" this restaurant)
- Post a food donation with food name, category (Veg / Non-Veg / Mixed), quantity (servings), expiry window, pickup address, and notes
- Track the live status of every donation your restaurant has posted

### 🤝 NGO Mapping
- Register an NGO with name, area served, daily capacity, phone, and email
- Switch between multiple registered NGOs ("Act as" this NGO)
- Browse all available donations, automatically ranked with donations in your NGO's own area flagged **Nearby**
- Claim a donation to map it to your NGO

### 🚚 Food Pickup
- Full lifecycle tracker for every donation: **Available → Claimed → Scheduled → Picked Up → Delivered**
- NGOs schedule a pickup time, then mark a donation picked up and finally delivered
- Donations that pass their expiry window before pickup are automatically marked **Expired**
- Filter the master donation list by status or by city

### 🔔 Notifications
- Live activity feed for every event: new donation posted, donation claimed, pickup scheduled, picked up, delivered, or expired
- Unread badge on the Notifications tab, "Mark all as read" action
- Dashboard surfaces the 5 most recent events at a glance

### 📊 Dashboard
- Total donations posted, meals saved (servings delivered), active NGOs, and pending pickups at a glance
- Recent activity preview

### 🎨 UX Polish
- Dark / light mode toggle (persisted to `localStorage`)
- All data (restaurants, NGOs, donations, notifications) persisted to `localStorage`, survives page refresh
- Demo data is seeded automatically on first load so the app is never empty
- Fully responsive, mobile-friendly layout

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JavaScript
- Google Fonts (Sora, Inter)
- No frameworks, no dependencies, no build step

## Run Locally

Open `index.html` directly in any modern browser. No server required.

## How It Works

Since this is a frontend-only demo (no backend/auth), "logging in" is simulated with an **Act as** control: register a restaurant or NGO, then select it as the active actor to unlock the relevant actions (posting donations as a restaurant, claiming/scheduling pickups as an NGO). All roles and data are visible to everyone in the app, which mirrors how a real restaurant ↔ NGO marketplace would work.