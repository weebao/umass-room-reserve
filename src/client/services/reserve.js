import { URL } from "./url.js";

export async function reserveRoom(room, formData) {
  const response = await fetch(`${URL}/reserve?id=${room}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formData }),
  });
  return await response.json();
}
