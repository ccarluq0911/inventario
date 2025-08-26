import { describe, it, expect, vi } from "vitest";
import { listItems, listMovements, updateItem, login } from "../api";

describe("API", () => {
  it("listItems fetches items", async () => {
    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, sku: "SKU123", quantity: 5 }]),
      } as Response)
    );

    const items = await listItems();
    expect(items[0].sku).toBe("SKU123");
  });

  it("listMovements fetches movements", async () => {
    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: 1, sku: "SKU123", ean13: "1111111111111", quantity: 5 },
          ]),
      } as Response)
    );

    const movs = await listMovements();
    expect(movs[0].ean13).toBe("1111111111111");
  });

  it("updateItem calls fetch with JWT", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, quantity: 10 }),
      } as Response)
    );
    window.fetch = mockFetch;

    await updateItem(1, 10, "fake-token");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/items/1"),
      expect.objectContaining({
        method: "PATCH",
        headers: expect.objectContaining({
          Authorization: "Bearer fake-token",
        }),
      })
    );
  });

  it("login returns token", async () => {
    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ access_token: "fake-jwt" }),
      } as Response)
    );

    const token = await login("admin", "admin123");
    expect(token).toBe("fake-jwt");
  });
});
