import { URL } from "./url.js";

export async function reserveRoom(id, date, startTime, endTime, formData) {
  const response = await fetch(`${URL}/room/book?id=${id}&date=${date}&startTime=${startTime}&endTime=${endTime}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return await response.json();
}
