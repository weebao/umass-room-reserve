import { URL } from "./url.js";

export async function loginUser(email, password) {
  const response = await fetch('/api/user/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
}


export async function registerUser(userData) {
  const response = await fetch('/api/user/register', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return await response.json();
}
