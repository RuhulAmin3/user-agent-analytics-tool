import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import analyticsRoutes from "./routes/analytics.js";
import { analyticsController } from "./controllers/analyticsController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set view engine
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));
// Store real user-agent data (runs for all requests before routes)
app.use((req, res, next) => {
  const userAgent = req.headers["user-agent"]; 
  console.log("User-Agent:", userAgent);
  if (userAgent && req.path !== "/favicon.ico") { 
    analyticsController.storeUserAgent(userAgent);
  }
  next();
});


// Routes
app.use("/analytics", analyticsRoutes);

// Home route
app.get("/", (_req, res) => {
  res.send(`
    <h1>User-Agent Analytics Tool</h1>
    <ul>
      <li><a href="/analytics">View Analytics Dashboard</a></li>
      <li><a href="/analytics/user-agents">Get User-Agents JSON</a></li>
      <li><a href="/analytics/csv">Download CSV Report</a></li>
    </ul>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});