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
        {items.map((it) => {
          const editedQty = editing[it.id] ?? it.quantity;
          const isSame = editedQty === it.quantity;

          return (
            <tr key={it.id}>
              <td>{it.sku}</td>
              <td>{it.ean13}</td>
              <td>{it.quantity}</td>
              <td>
                <input
                  type="number"
                  defaultValue={it.quantity}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      [it.id]: parseInt(e.target.value),
                    })
                  }
                />
                <button
                  onClick={() => onUpdate(it.id, editedQty)}
                  disabled={isSame}
                >
                  Actualizar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
