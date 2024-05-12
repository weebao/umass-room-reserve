import database from "../db.js";

/**
 * Retrieves a building based on the provided options.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - A promise that resolves when the building is retrieved.
 */
export const getBuilding = async (req, res) => {
  const options = req.query;
  const result = await database.getBuilding(options.name);
  try {
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
  }
};
