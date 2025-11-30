import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import analyticsRoutes from "./src/routes/analytics.js";
import { analyticsController } from "./src/controllers/analyticsController.js";
import userAgentModel from "./src/models/userAgentModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set view engine
app.set("view engine", "ejs");
app.set("views", join(__dirname, "src", "views"));

// Store real user-agent data (runs for all requests before routes)
app.use((req, _res, next) => {
  const userAgent = req.headers["user-agent"];
  if (userAgent && req.path !== "/favicon.ico") {
    analyticsController.storeUserAgent(userAgent);
    // Broadcast updated analytics to all connected clients
    try {
      const counts = userAgentModel.getRealAnalytics();
      io.emit("userAgentCounts", counts);
    } catch (e) {
    }
  }
  next();
});

// Routes
app.use("/analytics", analyticsRoutes);

// Home route
app.get("/", (_req, res) => {
  res.send(`
    <html>
      <head>
        <title>User-Agent Analytics Tool</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);}
          h1 { color: #333; }
          ul { list-style: none; padding: 0; }
          li { margin: 16px 0; }
          a { color: #007bff; text-decoration: none; font-weight: bold; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>User-Agent Analytics Tool</h1>
          <ul>
            <li><a href="/analytics">View Analytics Dashboard</a></li>
            <li><a href="/analytics/user-agents">Get User-Agents JSON</a></li>
            <li><a href="/analytics/csv">Download CSV Report</a></li>
          </ul>
        </div>
      </body>
    </html>
  `);
});

io.on("connection", () => {
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});