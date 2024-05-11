import express, { response } from "express";
import logger from "morgan";
import cors from "cors";
import path from "path";
import open from "open";
import database from "./db.js";
import  encrypt from "./utils/crypt.js";

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

// get building
app.get("/api/getBuilding", async (req, res) => {
  const options = req.query;
  const result = await database.getBuilding(options.name);
  try {
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({ status: "error", message: "Internal server error", error: error.message });
  }
});

// login
app.get("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await database.getUser(email);
    if (userData.status === "success") {
      const encryptedPassword = password;
      if (userData.data.password === encryptedPassword) {
        res.status(200).json({ status: "success", message: "Login successful", data: { email: userData.email } });
      } else {
        res.status(401).json({ status: "error", message: "Invalid credentials" });
      }
    } else {
      res.status(404).json(userData);
    }
  } catch(error) {
    res.status(500).json({ status: "error", message: "Internal server error", error: error.message });
  }
});

app
  .route("/booking")
  .get((req, res, next) => {
    const option = req.query; // get the query parameters
    checkAvailability(res, option);
  }).all(MethodNotAllowedHandler)

// Serve index.html for all other routes to support SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve("src/client/index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // open(`http://localhost:${PORT}`);
});
