import { fireEvent, render, screen } from "@testing-library/react";
import InventoryList from "../components/InventoryList";
import { describe, it, expect, vi } from "vitest";

describe("InventoryList", () => {
  const items = [
    { id: 1, sku: "SKU123", ean13: "1111111111111", quantity: 5 },
    { id: 2, sku: "SKU456", ean13: "2222222222222", quantity: 10 },
  ];
  it("renders items correctly", () => {
    render(<InventoryList items={items} onUpdate={() => {}} />);

    expect(screen.getByText("SKU123")).toBeInTheDocument();
    expect(screen.getByText("SKU456")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("disables update button if quantity unchanged", () => {
    render(<InventoryList items={items} onUpdate={() => {}} />);
    const btns = screen.getAllByText(/actualizar/i);
    expect(btns[0]).toBeDisabled();
  });

  it("calls onUpdate when quantity changes", () => {
    const onUpdate = vi.fn();
    render(<InventoryList items={items} onUpdate={onUpdate} />);

    const input = screen.getAllByRole("spinbutton")[0];
    fireEvent.change(input, { target: { value: 8 } });

    const btn = screen.getAllByText(/actualizar/i)[0];
    fireEvent.click(btn);

    expect(onUpdate).toHaveBeenCalledWith(1, 8);
  });
});
