import { URL } from "./url.js";

export const getAllBuildings = async () => {
  try {
    const response = await fetch(`${URL}/buildings`);
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const getAllRoomsInBuilding = async (building) => {
  try {
    const response = await fetch(`${URL}/rooms?building=${building}`);
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const getRoom = async (id) => {
  try {
    const response = await fetch(`${URL}/room?id=${id}`);
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};