import express from "express";
import logger from "morgan";
import { database } from "./db.js";
import cors from "cors";
import path from "path";
import open from "open";
import encrypt from './utils/crypt.js'



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
app.use(express.static("src/client"));

//If the HTTP method is not explicitly defined for a matching route,
// respond with a 405 status code.
const MethodNotAllowedHandler = async (request, response) => {
  response.status(405);
  response.type("text/plain");
  response.send("Not Implemented");
};

app
  .get("/api/getBuilding", async (req, res) => {
    const options = req.query;
    const result = await database.getBuilding(options.name);
    res.json(result.data);
  })
  .all(MethodNotAllowedHandler);

// Serve index.html for all other routes to support SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve("src/client/index.html"));
});

app.post("/api/register", async (req, res) => {
  const { email, password, ...rest } = req.body;
  const { user, status, message } = await database.getUser(email);

  if (status === "success" && user) {
    return res.status(409).json({ message: "User already exists" });
  }

  const encryptedPassword = encrypt(password);
  const result = await database.addUser({ email, password: encryptedPassword, ...rest });

  if (result.status === "success") {
    res.status(201).json({ message: "User registered successfully" });
  } else {
    res.status(500).json({ message: result.message });
  }
});

const PORT = 3260;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  open(`http://localhost:${PORT}`);
});
