# Christophe Muller's Personal Website - Developer Guide

## Project Overview
This repository contains the source code for the personal website of **Christophe Muller**, a PhD student in Statistics at the University of Oxford. The site serves as an academic portfolio, showcasing his research, professional journey, and contact information.

It is a **Single Page Application (SPA)** built with **React**, utilizing `react-router-dom` for client-side routing.

### Key Technologies
*   **Core:** React 19, Create React App (`react-scripts`).
*   **Routing:** `react-router-dom` (v7).
*   **Visualization:** Chart.js (`react-chartjs-2`), Visx (`@visx/geo`, etc.), Leaflet (`react-leaflet`), and custom Canvas implementations.
*   **Math:** `mathjs` for computations (e.g., in the Imputation paper visualizer).
*   **Deployment:** GitHub Pages (`gh-pages`).

## Project Structure

```
/
├── public/                 # Static assets (images, index.html)
├── src/
│   ├── components/         # Page sections and widgets
│   │   ├── About.js        # "About Me" section
│   │   ├── Contact.js      # Contact details
│   │   ├── Footer.js       # Site footer
│   │   ├── Header.js       # Navigation bar
│   │   ├── Hero.js         # Landing page hero section
│   │   ├── Journey.js      # Timeline of professional path
│   │   ├── Research.js     # List of publications (hardcoded data)
│   │   ├── ImputationPaper.js # Interactive research paper visualization
│   │   ├── RegressionFitter.js # (Unused) Interactive polynomial regression tool
│   │   └── Running.js      # (Unused) Running goal chart wrapper
│   ├── App.js              # Main layout & Routing configuration
│   ├── App.css             # Main stylesheet (includes custom & utility classes)
│   └── index.js            # Entry point
└── package.json            # Dependencies & scripts
```

## Setup & Development

### Prerequisites
*   Node.js (LTS version recommended)
*   npm

### Commands

*   **Install Dependencies:**
    ```bash
    npm install
    ```

*   **Start Development Server:**
    ```bash
    npm start
    ```
    Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

*   **Build for Production:**
    ```bash
    npm run build
    ```
    Builds the app to the `build` folder. It bundles React in production mode and optimizes the build for the best performance.

*   **Deploy to GitHub Pages:**
    ```bash
    npm run deploy
    ```
    This script runs `npm run build` first (`predeploy`), then pushes the contents of the `build` folder to the `gh-pages` branch.

## Key Features & Components

### 1. Home Page (`/`)
Combines several components into a single scrolling view:
*   **Hero:** Introduction and photo.
*   **About:** Biography and background.
*   **Journey:** Vertical timeline of academic and professional milestones.
*   **Research:** List of papers with links to PDFs and GitHub repos.
*   **Contact:** Email and location info.

### 2. Interactive Research (`/research/imputation-benchmark`)
A dedicated route rendering `ImputationPaper.js`. This feature is currently not in use.
*   **Purpose:** Visualizes concepts from the paper "Do we Need Dozens of Methods for Real World Missing Value Imputation?".
*   **Features:**
    *   **Data Generation:** Simulates datasets with missing values.
    *   **Imputation Methods:** Visual comparison of Regression vs. Gaussian imputation.
    *   **Metrics:** Calculates and displays RMSE and Energy Distance dynamically.
    *   **Plotting:** Custom SVG implementation for scatter plots.

### 3. Styling Note
The project uses a mix of standard CSS (in `App.css`) and utility class names that resemble Tailwind CSS (e.g., `text-4xl`, `py-16`, `bg-gray-50`). Note that a full Tailwind configuration (like `tailwind.config.js`) is **not** present in the root, so some utility classes rely on custom definitions within `App.css` or might be placeholders.

## Unused / WIP Components
*   **`RegressionFitter.js`:** An interactive canvas for drawing points and fitting a polynomial regression line. Currently not imported in `App.js`.
*   **`Running.js`:** A wrapper for embedding a Google Sheet chart tracking running progress. Currently not imported in `App.js`.
