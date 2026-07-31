# AI Portfolio Builder

An interactive, production-quality static web application that enables developers to build, preview, customize, and export professional responsive portfolios entirely in the browser.

## Features

- **Interactive Portfolio Builder**: Dynamic forms to edit personal details, social profiles, skills, education history, work experience, projects, certifications, and achievements.
- **Three Sleek Templates**:
  - **Modern**: Clean grid layouts, interactive elements, soft gradients, and hover transitions.
  - **Minimal**: High contrast, elegant typography, rich layouts focusing on content clarity.
  - **Creative**: Distinct layouts, timelines, expressive design accents, and animations.
- **Real-Time Live Preview**: Instantly synchronizes form changes to an isolated preview pane with device size toggles (Desktop, Tablet, Mobile).
- **Theme Customizer**: Control colors, accent gradients, font family choices, container borders, and selectively toggle the visibility of individual sections.
- **Exporting Options**:
  - Export single-page `index.html` structure.
  - Export customized `style.css` matching chosen variables.
  - Export unified `portfolio.zip` file containing assets, HTML, and CSS (generated client-side).
  - Print-to-PDF layout focusing strictly on the resume output.
- **LocalStorage Sync**: Saves configurations and values on every keystroke, restoring the environment immediately on load.

## Folder Structure

```text
projects/
└── AI Portfolio Builder/
    ├── index.html          # Dashboard layout and controls
    ├── style.css           # Editor interface styles (glassmorphism)
    ├── script.js           # Core state management, template compiler, and exporter
    ├── README.md           # Documentation
    ├── project.json        # BuildVerse project metadata
    └── assets/
        ├── icons/          # Directory for custom icons
        ├── images/         # Images and default assets
        └── screenshots/    # Application preview screenshots
```

## Technologies Used

- **HTML5**: Semantic tags, accessibility indicators.
- **CSS3**: Variables, Flexbox, Grid, Glassmorphic effects, responsive styling.
- **Vanilla JavaScript (ES6)**: State management, live iframe DOM generation, client-side ZIP builder.
- **Lucide Icons**: Vector iconography.
- **JSZip (via CDN)**: Archive bundling entirely client-side.

## Installation

No installations or local builds are required. To launch the application locally, open the `index.html` file in any modern web browser (e.g., Chrome, Edge, Firefox).

```bash
# Clone the repository
git clone https://github.com/KolaSailaja/BuildVerse.git

# Navigate to the project directory
cd "projects/AI Portfolio Builder"

# Open index.html directly in your browser or run via live-server
```

## Usage

1. **Fill Your Information**: Complete the personal bio, skills list, professional experience, academic background, and project fields. Use the **Add/Remove** buttons to add as many projects or experience entries as desired.
2. **Select a Template**: Use the template selector to switch layouts (Modern, Minimal, Creative) instantly.
3. **Customize Aesthetics**: Tweak primary/accent colors, adjust border sharpness, select from Google Fonts, and toggle section visibility under the Theme panel.
4. **Preview Responsiveness**: Switch the preview window dimensions to test Mobile, Tablet, and Desktop layouts.
5. **Export & Share**:
   - Download the individual files (`index.html`, `style.css`).
   - Click "Export ZIP" to download a fully packaged static site.
   - Click "Print PDF" to save a clean PDF resume.

## License

This project is licensed under the MIT License - see the LICENSE file at the root repository for details.
