import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const options = req.query;
  const result = await database.getBuilding(options.name);
  try {
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json({ status: "error", message: "Internal server error", error: error.message });
  }
});

module.exports = router;