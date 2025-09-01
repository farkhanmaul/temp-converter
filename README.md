# Temperature Converter

A simple, responsive temperature converter built with Next.js and Tailwind CSS. Convert temperatures between Celsius, Fahrenheit, and Kelvin with real-time calculations.

## Features

- 🌡️ Convert between Celsius, Fahrenheit, and Kelvin
- 💡 Real-time conversion as you type
- 🎨 Clean, modern UI with Tailwind CSS
- 📱 Fully responsive design
- ⚡ Built with Next.js and TypeScript
- 🚀 Ready for GitHub Pages deployment
- 🎯 Custom favicon with thermometer design

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **GitHub Pages** - Static hosting
- **GitHub Actions** - Automated deployment

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/temperature-converter.git
cd temperature-converter
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages:

1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Set Source to "GitHub Actions"
4. The site will automatically deploy when you push to the main branch

## Project Structure

```
temperature-converter/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       └── TemperatureConverter.tsx
├── .github/workflows/
│   └── deploy.yml
├── next.config.ts
└── package.json
```
