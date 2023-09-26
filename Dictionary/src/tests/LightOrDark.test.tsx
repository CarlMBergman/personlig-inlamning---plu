import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("light or dark mode", () => {
  it("should toggle to dark-mode when checkbox is clicked", async () => {
    render(<App />);
    const checkbox = screen.getByText("light/dark mode");
    await userEvent.click(checkbox);
    expect(screen.getByRole("banner")).toHaveClass("dark");
  });

  it("should toggle to light-mode when checkbox is clicked again", async () => {
    render(<App />);
    const checkbox = screen.getByText("light/dark mode");
    await userEvent.click(checkbox);

    expect(screen.getByRole("banner")).not.toHaveClass("dark");
  });

  it("should be dark when entering page if user has toggled dark previously", () => {
    sessionStorage.setItem("lightOrDark", "dark");
    render(<App />);
    expect(screen.getByRole("banner")).toHaveClass("dark");
  });

  it("should be light when entering page if user has toggled light previously", () => {
    sessionStorage.setItem("lightOrDark", "");
    render(<App />);
    expect(screen.getByRole("banner")).not.toHaveClass("dark");
  });
});
