# Lost & Found Exchange

A browser-based Lost &amp; Found platform — report a lost or found item, browse reports with nearby/keyword match suggestions, verify a claim with a QR code, and chat with the other party.

## Features
- **Lost Item Posting**: Report something as lost or found, with category, description, location, date, and contact info.
- **Nearby Matches**: Optional geolocation capture on report + "Show potential matches only" filter that pairs lost/found reports by category and shared keywords, with distance-based sorting.
- **QR Verification**: Every report gets a unique claim QR code. Generate and download it, or scan/upload one under **QR Verify** to confirm a claim and mark the item resolved.
- **Chat**: Per-report message thread so the reporter and claimant can coordinate handover.

## Built with

HTML, CSS, and vanilla JS (single file). Uses `qrcode-generator` and `jsQR` (loaded via CDN) for QR encoding/decoding, the browser Geolocation API for distance matching, and `localStorage` for all data (reports + chat threads).