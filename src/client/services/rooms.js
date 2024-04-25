import { URL } from "./url.js";

export async function getBuildingByQuery(query) {
  try {
    const response = await fetch(`${URL}/getBuilding?name=${query}`);
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}

export async function getAllRoomsInBuilding(building) {
  try {
    const response = await fetch(`${URL}/getRoom?building=${building}`);
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}

export async function getRoom(id) {
  try {
    const response = await fetch(`${URL}/getRoom?id=${id}`);
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}