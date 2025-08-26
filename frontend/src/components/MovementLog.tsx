import type { Movement } from "../types";

export default function MovementLog({ movements }: { movements: Movement[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Item ID</th>
          <th>Cambio</th>
          <th>Tipo</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {movements.map((m) => (
          <tr key={m.id}>
            <td>{m.item_id}</td>
            <td>{m.change}</td>
            <td>{m.type}</td>
            <td>{new Date(m.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
