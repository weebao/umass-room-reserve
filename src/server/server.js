import express, { response } from "express";
import logger from "morgan";
import cors from "cors";
import path from "path";
import open from "open";

const userRoutes = require("./routes/user.routes.js");
const buildingRoutes = require("./routes/building.routes.js");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use CORS middleware (configure as needed)
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "OPTIONS"], // Allowed methods
  })
);

// Serve static files from the 'src/client' directory
app.use(express.static("src/client/index.html"));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/building", buildingRoutes);

// Serve index.html for all other routes to support SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve("src/client/index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // open(`http://localhost:${PORT}`);
});
