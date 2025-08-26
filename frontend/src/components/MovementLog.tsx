import type { Movement } from "../types";

export default function MovementLog({ movements }: { movements: Movement[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>EAN13</th>
          <th>Cambio</th>
          <th>Tipo</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {movements.map((m) => (
          <tr key={m.id}>
            <td>{m.sku}</td>
            <td>{m.ean13}</td>
            <td>{m.change}</td>
            <td>{m.type}</td>
            <td>{new Date(m.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
