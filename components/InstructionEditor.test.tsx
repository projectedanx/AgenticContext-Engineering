import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { InstructionEditor } from "./InstructionEditor";

describe("InstructionEditor", () => {
  const defaultProps = {
    value: "Initial instruction",
    onChange: vi.fn(),
    storageKey: "test-storage-key",
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders correctly with initial value", () => {
    render(<InstructionEditor {...defaultProps} />);
    expect(screen.getByText("Core Instructions")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("Initial instruction");
  });

  it("calls onChange when user types", () => {
    render(<InstructionEditor {...defaultProps} />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, {
      target: { value: "Initial instruction updated" },
    });

    expect(defaultProps.onChange).toHaveBeenCalledWith(
      "Initial instruction updated",
    );
  });

  it("displays correct save statuses", async () => {
    // Render with an initial value
    const { rerender } = render(<InstructionEditor {...defaultProps} />);

    const textarea = screen.getByRole("textbox");

    // Simulate user typing
    fireEvent.change(textarea, { target: { value: "updated value" } });

    // Status should be "Unsaved changes" immediately
    expect(screen.getByText("Unsaved changes")).toBeInTheDocument();

    // The component needs the new value to trigger the useEffect properly
    rerender(<InstructionEditor {...defaultProps} value="updated value" />);

    // Fast forward to trigger saving status and saved status
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // After 1 second it should save
    expect(screen.getByText("Saved")).toBeInTheDocument();

    // And verify local storage was updated
    expect(localStorage.getItem("test-storage-key")).toBe("updated value");

    // Fast forward to idle status
    act(() => {
      vi.advanceTimersByTime(2500);
    });

    // Status should be gone
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
    expect(screen.queryByText("Unsaved changes")).not.toBeInTheDocument();
  });
});
