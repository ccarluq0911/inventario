import type { Item, Movement } from "./types";

const BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export async function listItems(): Promise<Item[]> {
  const res = await fetch(`${BASE}/items`);
  if (!res.ok) throw new Error("Error cargando items");
  return res.json();
}

export async function updateItem( id: number, quantity: number, token: string
): Promise<Item> {
  const res = await fetch(`${BASE}/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error("Error actualizando item");
  return res.json();
}

export async function listMovements(): Promise<Movement[]> {
  const res = await fetch(`${BASE}/movements`);
  if (!res.ok) throw new Error("Error cargando movimientos");
  return res.json();
}

export async function login(
  username: string,
  password: string
): Promise<string> {
  const res = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Usuario o contraseña incorrecta");
  const data = await res.json();
  return data.access_token;
}
