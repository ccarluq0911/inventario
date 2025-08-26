import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../components/LoginForm";
import { describe, it, expect, vi } from "vitest";

describe("LoginForm", () => {
  it("calls onLogin with token", async () => {
    const onLogin = vi.fn();

    render(<LoginForm onLogin={onLogin} />);

    fireEvent.change(screen.getByLabelText(/usuario/i), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "admin123" },
    });

    // Mock fetch
    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ access_token: "fake-jwt" }),
      } as Response)
    );

    fireEvent.click(screen.getByText(/login/i));
    // Espera un tick de async
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(onLogin).toHaveBeenCalledWith("fake-jwt");
  });
});
