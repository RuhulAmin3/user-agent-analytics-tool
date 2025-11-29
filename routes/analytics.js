import { Router } from "express";
import { analyticsController } from "../controllers/analyticsController.js";

const router = Router();

// GET /analytics/user-agents - JSON analytics data
router.get("/user-agents", analyticsController.getUserAgentAnalytics);

// GET /analytics - Analytics dashboard with chart
router.get("/", analyticsController.renderAnalyticsDashboard);

// GET /analytics/csv - Download CSV report
router.get("/csv", analyticsController.downloadCSV);

// GET /analytics/raw - Get raw user-agent data
router.get("/raw", analyticsController.getRawUserAgents);

export default router;