# User-Agent Analytics Tool

A small Express.js app that collects and visualizes user-agent strings from incoming requests. It supports mock data and real data collection, lets you view analytics, download CSV reports, and inspect raw data.

## Features
- Collect user-agent strings from all incoming HTTP requests (excluding `/favicon.ico`).
- Simple analytics dashboard with chart and summary cards.
- Export analytics as CSV.
- Toggle between mock and real data via query parameter.

## Requirements
- Node.js v14+ (ES Modules enabled). Tested with Node 22.
- npm

## Install
```bash
git clone <repo-url>
cd "Assignment - two"
npm install
```

## Run (development)
```bash
npm run dev
```

This starts the server on `http://localhost:3000` by default.

## Usage
- Dashboard: `GET /analytics`
- JSON analytics: `GET /analytics/user-agents?useRealData=true|false`
- CSV export: `GET /analytics/csv?useRealData=true|false`
- Raw data: `GET /analytics/raw`

Query params supported for dashboard and exports:
- `useRealData` — `true` to use persisted/real data, `false` for mock data (default)
- `startDate` and `endDate` — ISO date strings used when `useRealData=true`

## Notes
- The project uses ES module imports; file extensions (`.js`) are required in import paths.
- The middleware that stores user-agents runs before route registration so every request is captured.

## Development
- Views are in `src/views/analytics.ejs`.
- Routes: `src/routes/analytics.js`.
- Controllers: `src/controllers/analyticsController.js`.
- Models: `src/models/userAgentModel.js`.

If you want, I can add a small database or switch storage to a JSON file or SQLite for persistence.
