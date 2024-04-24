import { URL } from "./url.js";

export const reserveRoom = async (room, formData) => {
  try {
    const response = await fetch(`${URL}/reserve?id=${room}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}