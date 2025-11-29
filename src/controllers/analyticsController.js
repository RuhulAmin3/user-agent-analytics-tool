import userAgentModel from '../models/userAgentModel.js';
import { stringify } from 'csv-stringify/sync';

// Get user-agent analytics (JSON)
function getUserAgentAnalytics(req, res) {
    try {
        const { startDate, endDate, useRealData } = req.query;

        let analytics;
        if (useRealData === 'true') {
            analytics = userAgentModel.getRealAnalytics(startDate, endDate);
        } else {
            analytics = userAgentModel.analyzeUserAgents();
        }
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Render analytics dashboard
function renderAnalyticsDashboard(req, res) {
    const { startDate, endDate, useRealData } = req.query;

    let analytics;
    if (useRealData === 'true') {
        analytics = userAgentModel.getRealAnalytics(startDate, endDate);
    } else {
        analytics = userAgentModel.analyzeUserAgents();
    }

    res.render('analytics', {
        analytics,
        useRealData: useRealData === 'true',
        startDate: startDate || '',
        endDate: endDate || ''
    });
}

// Store user-agent (for real data collection)
function storeUserAgent(userAgent) {
    userAgentModel.storeUserAgent(userAgent);
}

// Download CSV report
function downloadCSV(req, res) {
    try {
        const { startDate, endDate, useRealData } = req.query;

        let analytics;
        if (useRealData === 'true') {
            analytics = userAgentModel.getRealAnalytics(startDate, endDate);
        } else {
            analytics = userAgentModel.analyzeUserAgents();
        }

        // Convert analytics to CSV format
        const csvData = Object.entries(analytics).map(([client, count]) => ({
            Client: client,
            Count: count
        }));

        const csv = stringify(csvData, { header: true });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="user-agent-analytics.csv"');
        res.send(csv);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get raw user-agent data
function getRawUserAgents(req, res) {
    try {
        const userAgents = userAgentModel.getAllUserAgents();
        res.json(userAgents);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const analyticsController =   {
    getUserAgentAnalytics,
    renderAnalyticsDashboard,
    storeUserAgent,
    downloadCSV,
    getRawUserAgents
};