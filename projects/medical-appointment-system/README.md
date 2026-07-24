# Medical Appointment System

A browser-based appointment manager for small clinics. Book a slot with a doctor, auto-queue walk-in patients behind booked ones, attach a prescription note to each closed visit, and export a clinic-day report (JSON / CSV) — all client-side with `localStorage`.

## Features

- **Doctor Booking** — pick a doctor (4 fictional doctors across general medicine, pediatrics, cardiology, orthopedics), pick a date, pick a 15-minute slot; bookings are unique per (doctor, day, slot).
- **Queue Management** — every visit has a 6-digit token number; the queue view shows booked vs walk-in patients in token order; tap "Mark done" to discharge a patient and pull the next one up.
- **Reports** — export per-day clinic report (JSON or CSV) summarising all visits, ticket count, total billed (if entered), and per-doctor load.
- **Prescription Storage** — every discharged visit can carry a free-text prescription note + medication list; persisted alongside the visit record; re-openable from the History tab.

## Built with

HTML, CSS, and vanilla JavaScript (single file). Uses `localStorage` for persistence and `Blob`/`URL.createObjectURL` for JSON / CSV downloads. No build step, no backend.

The demo doctors are fictional. Real production would need a real backend + auth; this PR's scope is the UI/data layer for BuildVerse's project-style contributions.
