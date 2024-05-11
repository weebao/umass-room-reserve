import PouchDB from 'pouchdb';
import mockdata from "./mockdata.js";
const { buildings, rooms, users } = mockdata;

/**
 * Initializes a PouchDB database with specified collections if they do not
 * exist.
 *
 * This function creates a new PouchDB instance with the given database name. It
 * attempts to retrieve collections for 'buidlings', 'rooms' and 'users'. If these
 * collections do not exist, it creates them with mockdata.
 *
 * @param {string} dbname - The name of the database to initialize.
 */
const initdb = async(dbname) => {
  // Initialize the database if it doesn't exist
  const db = new PouchDB(dbname);

  // Get the buidlings collection. If it doesn't exist, create it.
  try {
    const buildings = await db.get("buildings");
  } catch (e) {
    db.put({ _id: "buildings", buildings: buildings });
  }

  // Get the rooms collection. If it doesn't exist, create it.
  try {
    const rooms = await db.get("rooms");
  } catch (e) {
    db.put({ _id: "rooms", rooms: rooms });
  }

  // Get the users collection. If it doesn't exist, create it.
  try {
    const users = await db.get("users");
  } catch (e) {
    db.put({ _id: "users", users: users });
  }

  // Close the database connection
  db.close();
}

const Database = (dbname) => {
  // Initialize the database
  initdb(dbname);

  /**
   * Helper function to create a new PouchDB instance.
   * @returns {PouchDB} A new PouchDB instance connected to the specified
   * database.
   */
  const getDB = () => new PouchDB(dbname);

  const obj = {
    getBuilding: async (name) => {
      try {
        const db = getDB();
        const data = await db.get("buildings");
        const filteredBuildings = data.buildings.filter((building) =>
          building.name.toLowerCase().includes(name.toLowerCase()));
        db.close();
        return {
          status: "success",
          data: filteredBuildings
        };
      } catch(e) {
        return {
          status: "error",
          message: "Failed to get building",
          error: e.message,
        };
      }
    },
    getUser: async (email) => {
      try{
        const db = getDB();
        const data = await db.get("users");
        const user = data.users.find(user => user.email.toLowerCase() === email.toLowerCase());
        db.close();
        return user ? {
          status: "success",
          data: user
        } : {
          status: "error",
          message: "User not found",
        };
      } catch(e) {
        return {
          status: "error",
          message: "Failed to get user",
          error: e.message,
        };
      }
    }
  };

  return obj;
};

//Create new database instance
const database = Database("umass_reserve_rooms");

export default database;