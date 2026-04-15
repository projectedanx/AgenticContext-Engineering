import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, beforeEach, it, expect } from "vitest";
import App from "./App";
import { generateResponse } from "./services/geminiService";

vi.mock("./services/geminiService");

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays an error message when generateResponse fails", async () => {
    const mockError = new Error("API failed");
    vi.mocked(generateResponse).mockRejectedValueOnce(mockError);

    render(<App />);

    const generateButton = screen.getByText("Run Agent");
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(screen.getByText("API failed")).toBeInTheDocument();
    });
  });
});
