import type { Item, Movement } from "./types"

const BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000"

export async function listItems(): Promise<Item[]> {
  const res = await fetch(`${BASE}/items`)
  if (!res.ok) throw new Error("Error cargando items")
  return res.json()
}

export async function updateItem(id: number, quantity: number): Promise<Item> {
  const res = await fetch(`${BASE}/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  })
  if (!res.ok) throw new Error("Error actualizando item")
  return res.json()
}

export async function listMovements(): Promise<Movement[]> {
  const res = await fetch(`${BASE}/movements`)
  if (!res.ok) throw new Error("Error cargando movimientos")
  return res.json()
}
