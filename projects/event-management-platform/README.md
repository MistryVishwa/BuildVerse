# Event Management Platform

A browser-based event management toolkit — register attendees, issue QR-coded tickets, check people in at the door, and watch registration and attendance numbers update live.

## Features
- **Registration**: Capture attendee name, email, and event, and instantly generate a ticket.
- **QR Tickets**: Each registration issues a perforated ticket stub with a scannable QR code, downloadable as PNG.
- **Attendance**: Check attendees in by scanning their ticket with the camera, uploading a photo of it, or searching and checking them in manually.
- **Analytics**: Live stats for total registered, checked in, and attendance rate, plus a per-event breakdown chart and a recent check-ins feed.

## Built with

HTML, CSS, and vanilla JS (single file). Uses `qrcode-generator` and `jsQR` (loaded via CDN) for encoding/decoding tickets, and `localStorage` to persist attendees and check-in state.