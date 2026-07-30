# Blood Donation Finder

A browser-based platform to find blood donors during emergencies — register as a donor, search the registry, post an emergency request, and check nearby hospital blood banks.

## Features
- **Live Donor Search**: Browse the donor registry, filter by blood group and availability, sort by distance.
- **Blood Groups**: Built-in donor↔recipient compatibility rules (e.g. O- as universal donor, AB+ as universal recipient) power a "Compatible donors only" filter.
- **Emergency Request**: Post an urgent request with blood group, units needed, urgency level, and hospital/location — instantly see how many compatible available donors are in the registry.
- **Hospital Integration**: A directory of nearby hospitals and blood banks with contact numbers and one-tap "Get directions" links.

## Built with

HTML, CSS, and vanilla JS (single file). Uses the browser Geolocation API for distance-based sorting/matching and `localStorage` for the donor registry and request board. The hospital directory is sample data — swap in real local hospital/blood bank details as needed.