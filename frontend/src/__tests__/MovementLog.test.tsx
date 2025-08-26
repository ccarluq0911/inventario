import { render, screen } from "@testing-library/react";
import MovementLog from "../components/MovementLog";
import { describe, it, expect } from "vitest";
import type { Movement } from "../types";

describe("MovementLog", () => {
  const movements: Movement[] = [
    {
      id: 1,
      item_id: 1,
      type: "IN",
      change: 5,
      timestamp: "2025-08-26T19:30:00",
      sku: "SKU123",
      ean13: "1111111111111",
    },
    {
      id: 2,
      item_id: 2,
      type: "OUT",
      change: 3,
      timestamp: "2025-08-26T19:35:00",
      sku: "SKU456",
      ean13: "2222222222222",
    },
  ];

  it("renders movements correctly", () => {
    render(<MovementLog movements={movements} />);
    expect(screen.getAllByText(/SKU123/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/SKU456/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/5/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/3/)[0]).toBeInTheDocument();
  });
});
