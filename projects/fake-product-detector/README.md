# Fake Product Detector

A browser-based toolkit to spot counterfeit products. Scan a barcode (or paste one manually), look the product up against an in-memory registry of known-brand barcodes, get an instant authenticity verdict, and file a fraud report if you spot a fake — all client-side with an audit trail in `localStorage`.

## Features

- **Barcode scan** — uses the device camera via `getUserMedia` + `ZXing` (loaded from CDN) when available; falls back to manual entry on iOS Safari / desktop.
- **Manual entry** — paste a 8/12/13/14-digit numeric barcode and click **Verify**.
- **Product verification** — built-in registry maps known barcodes to brand + product name; unknown barcodes are flagged `Unknown — Verify Manually` with a risk score derived from the brand-prefix table.
- **Brand-prefix table** — GS1-style 3-digit company-prefix → brand name lookup, so even a never-seen barcode is classified by its manufacturer.
- **Fraud reporting** — any scan can be flagged with a reason (counterfeit packaging, wrong seal, suspicious texture, price mismatch, location discrepancy, other). Reports stored in `localStorage` with timestamp, barcode, brand verdict, reason, and an inline reviewer note.
- **Audit log** — every scan, verdict, and fraud report is timestamped in a single append-only log; exportable as JSON.
- **Persistence** — `localStorage` survives reloads; clear-log button for privacy.
- **Dark mode** — graceful light/dark theme that respects system preference.

## Built with

HTML, CSS, and vanilla JavaScript (single file). Uses [`@zxing/library`](https://github.com/zxing-js/library) loaded from CDN for barcode decoding. No build step, no backend.
