import { useState } from "react";
import type { Item } from "../types";

export default function InventoryList({
  items,
  onUpdate,
}: {
  items: Item[];
  onUpdate: (id: number, qty: number) => void;
}) {
  const [editing, setEditing] = useState<Record<number, number>>({});

  return (
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>EAN13</th>
          <th>Cantidad</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {items.map((it) => (
          <tr key={it.id}>
            <td>{it.sku}</td>
            <td>{it.ean13}</td>
            <td>{it.quantity}</td>
            <td>
              <input
                type="number"
                defaultValue={it.quantity}
                onChange={(e) =>
                  setEditing({ ...editing, [it.id]: parseInt(e.target.value) })
                }
              />
              <button
                onClick={() => onUpdate(it.id, editing[it.id] ?? it.quantity)}
              >
                Actualizar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
