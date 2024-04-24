import { URL } from "./url.js";

export const getBuildingByQuery = async (query) => {
  try {
    const response = await fetch(`${URL}/getBuilding?name=${query}`);
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}

export const getAllRoomsInBuilding = async (building) => {
  try {
    const response = await fetch(`${URL}/getRoom?building=${building}`);
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const getRoom = async (id) => {
  try {
    const response = await fetch(`${URL}/getRoom?id=${id}`);
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};