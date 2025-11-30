# User-Agent Analytics Tool

A small Express.js app that collects and visualizes user-agent strings from incoming requests. It supports mock data and real data collection, lets you view analytics, download CSV reports, and inspect raw data.

## Features
- Collect user-agent strings from all incoming HTTP requests (excluding `/favicon.ico`).
- Simple analytics dashboard with chart and summary cards.
- Export analytics as CSV.
- Toggle between mock and real data via query parameter.
 - Realtime dashboard updates via `socket.io` when using real data.

## Requirements
- Node.js v14+ (ES Modules enabled). Tested with Node 22.
- npm

## Install
```bash
git clone https://github.com/RuhulAmin3/user-agent-analytics-tool
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

### Live updates (socket.io)
- Open `http://localhost:3000/analytics?useRealData=true` to enable realtime updates.
- While the page is open, trigger requests to the server (refresh the page, call any route). Each new request’s `user-agent` is stored and the dashboard updates live.
- The client loads `'/socket.io/socket.io.js'` automatically from the server.

Query params supported for dashboard and exports:
- `useRealData` — `true` to use persisted/real data, `false` for mock data (default)
- `startDate` and `endDate` — ISO date strings used when `useRealData=true`

## Notes
- The project uses ES module imports; file extensions (`.js`) are required in import paths.
- The middleware that stores user-agents runs before route registration so every request is captured.
 - Realtime updates are only active when `useRealData=true` to avoid mixing mock data with live counts.
 - `socket.io` is installed as a dependency and integrated with the HTTP server (`app.js`).

## Development
- Views are in `src/views/analytics.ejs`.
- Routes: `src/routes/analytics.js`.
- Controllers: `src/controllers/analyticsController.js`.
- Models: `src/models/userAgentModel.js`.
 - Socket server initialization is in `app.js`; the client subscribes to `userAgentCounts` events and re-renders the chart and stats grid.
