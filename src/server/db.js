import PouchDB from "pouchdb";
import mockdata from "./lib/mockdata.js";
const { buildings, rooms, users } = mockdata;

export class Database {
  constructor(dbname) {
    this.dbname = dbname;
    this.db = new PouchDB(dbname);
    this.initDB();
  }

  async initDB() {  
    // Get the buidlings collection. If it doesn't exist, create it.
    try {
      const buildings = await this.db.get("buildings");
    } catch (e) {
      this.db.put({ _id: "buildings", buildings: buildings });
    }
  
    
    // Get the rooms collection. If it doesn't exist, create it.
    try {
      const rooms = await this.db.get("rooms");
    } catch (e) {
      this.db.put({ _id: "rooms", rooms: rooms });
    }
    
    // Get the users collection. If it doesn't exist, create it.
    try {
      const users = await this.db.get("users");
    } catch (e) {
      this.db.put({ _id: "users", users: users });
    }
  }

  open() {
    this.db = new PouchDB(this.dbname);
  }

  reset() {
    this.db.destroy();
    this.db = new PouchDB(this.dbname);
    this.initDB();
  }

  close() {
    this.db.close();
  }

  async getBuilding(name) {
    try {
      const data = await this.db.get("buildings");
      const filteredBuildings = data.buildings.filter((building) =>
        building.name.toLowerCase().includes(name.toLowerCase())
      );
      return {
        status: "success",
        data: filteredBuildings,
      };
    } catch (e) {
      return {
        status: "error",
        message: "Failed to get building",
        error: e.message,
      };
    }
  }

  async getUser(email) {
    try {
      const data = await this.db.get("users");
      const user = data.users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );
      return user
        ? {
            status: "success",
            data: user,
          }
        : {
            status: "error",
            message: "User not found",
          };
    } catch (e) {
      throw new Error(JSON.stringify({
        status: "error",
        message: "Failed to get user",
        error: e.message,
      }));
    }
  }

  async createUser(userData) {
    try {
      const data = await this.db.get("users");
      data.users.push(userData);
      await this.db.put(data);
      return {
        status: "success",
        data: userData,
      };
    } catch (e) {
      throw new Error(JSON.stringify({
        status: "error",
        message: "Failed to create user",
        error: e.message,
      }));
    }
  }

  async updateUser(email, userData) {
    try {
      const data = await this.db.get("users");
      const userIndex = data.users.findIndex(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );
      if (userIndex === -1) {
        return {
          status: "error",
          message: "User not found",
        };
      }
      data.users[userIndex] = { ...data.users[userIndex], ...userData };
      await this.db.put(data);
      return {
        status: "success",
        data: data.users[userIndex],
      };
    } catch (e) {
      throw new Error(JSON.stringify({
        status: "error",
        message: "Failed to update user",
        error: e.message,
      }));
    }
  }

  async deleteUser(email) {
    try {
      const data = await this.db.get("users");
      const userIndex = data.users.findIndex(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );
      if (userIndex === -1) {
        return {
          status: "error",
          message: "User not found",
        };
      }
      data.users.splice(userIndex, 1);
      await this.db.put(data);
      return {
        status: "success",
        message: "User deleted",
      };
    } catch (e) {
      throw new Error(JSON.stringify({
        status: "error",
        message: "Failed to delete user",
        error: e.message,
      }));
    }
  }
}

//Create new database instance
const database = new Database("umass_reserve_rooms");

export default database;
