import { URL } from "./url.js";

export async function getBuildingByQuery(query) {
  const response = await fetch(`${URL}/getBuilding?name=${query}`);
  return await response.json();
}

export async function getAllRoomsInBuilding(building) {
  const response = await fetch(`${URL}/getRoom?building=${building}`);
  return await response.json();
}

export async function getRoom(id) {
  const response = await fetch(`${URL}/getRoom?id=${id}`);
  return await response.json();
}
