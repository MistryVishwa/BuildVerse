# QR Code Toolkit

A browser-based toolkit for generating and scanning QR codes — URLs, WiFi credentials, contact cards, and plain text — with color customization, logo overlays, and a saved history.

## Features
- **QR Generator**: Encode URLs, WiFi credentials, contact cards (vCard), or text.
- **QR Scanner**: Scan via camera or by uploading an image.
- **Download PNG/SVG**: Export the generated code in either format.
- **Color Customization**: Pick foreground and background colors.
- **Logo Upload**: Overlay a logo in the center of the code.
- **History**: Every generated or scanned code is saved for later.

## Built with

HTML, CSS, and vanilla JS (single file). Uses `qrcode-generator` and `jsQR` (loaded via CDN) for encoding/decoding, and `localStorage` for history.