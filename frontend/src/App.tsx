import { useState, useEffect } from "react";
import type { Item, Movement } from "./types";
import { listItems, listMovements, updateItem } from "./api";
import InventoryList from "./components/InventoryList";
import MovementLog from "./components/MovementLog";
import "./App.css";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [movs, setMovs] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        const [it, mv] = await Promise.all([listItems(), listMovements()]);
        setItems(it);
        setMovs(mv);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleUpdate(id: number, qty: number) {
    await updateItem(id, qty);
    const [it, mv] = await Promise.all([listItems(), listMovements()]);
    setItems(it);
    setMovs(mv);
  }

  if (loading) return <div>{error ? `Error: ${error}` : "Cargando..."}</div>;

  return (
    <div className="holder">
      <h1>Stock de Inventario</h1>
      <InventoryList items={items} onUpdate={handleUpdate} />
      <h2>Historial de Movimientos</h2>
      <MovementLog movements={movs} />
    </div>
  );
}

export default App;
