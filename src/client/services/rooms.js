import { URL } from "./url.js";
import { buildings, rooms } from "../mock/mockdata.js";

export async function getRoomsByQueryWithMock(query) {
  // Simulate fetching with a delay of 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  if (query.trim() === "") return { buildings, rooms };

  const bld = buildings.filter((building) => {
    return building.name.toLowerCase().includes(query.toLowerCase());
  });

  const rm = rooms.filter((room) => {
    return bld.some((e) => {
      return e.building_id === room.building_id;
    });
  });

  // First sort by building, and get only rooms that match the remain building id
  return { buildings: bld, rooms: rm };
}

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
