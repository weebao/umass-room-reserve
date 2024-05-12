import express, { response } from "express";
import logger from "morgan";
import cors from "cors";
import path from "path";
import open from "open";

import userRoutes from "./routes/user.routes.js";
import buildingRoutes from "./routes/building.routes.js";
import roomRoutes from "./routes/room.routes.js";

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use CORS middleware (configure as needed)
const apiCorsOptions = {
  origin: "*", // Adjust as needed
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Typically allowed methods for APIs
};
app.use(cors(apiCorsOptions));

// Serve static files from the 'src/client' directory
app.use(express.static("src/client"));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/building", buildingRoutes);
app.use("/api/room", roomRoutes);

// Serve index.html for all other routes to support SPA routing
app.get("*", (req, res) => {
  if (!req.path.startsWith('/api')) { // Ensure that API calls do not get HTML responses
    res.sendFile(path.resolve('src/client/index.html'));
  } else {
    res.status(404).send({ error: 'API endpoint not found' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // open(`http://localhost:${PORT}`); // Use this to automatically open the browser
});
