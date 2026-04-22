import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useAutoSave } from "./useAutoSave";

describe("useAutoSave", () => {
  const mockOnChange = vi.fn();
  const storageKey = "test-storage-key";
  const initialProps = {
    value: "initial",
    onChange: mockOnChange,
    storageKey,
  };

  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    mockOnChange.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
  });

  it("should initialize with 'idle' state", () => {
    const { result } = renderHook(() => useAutoSave(initialProps));
    expect(result.current.saveStatus).toBe("idle");
  });

  it("should trigger onChange and transition states correctly", () => {
    const { result, rerender } = renderHook((props) => useAutoSave(props), {
      initialProps,
    });

    act(() => {
      result.current.handleValueChange("new value");
    });

    expect(mockOnChange).toHaveBeenCalledWith("new value");

    // The state should be unsaved before the value prop is updated by parent
    expect(result.current.saveStatus).toBe("unsaved");

    // Simulate the parent component updating the value prop
    rerender({ ...initialProps, value: "new value" });

    // The effect sets status to saving
    expect(result.current.saveStatus).toBe("saving");

    // Advance timer by 1000ms to trigger the save to localStorage
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.saveStatus).toBe("saved");
    expect(localStorage.getItem(storageKey)).toBe("new value");

    // Advance timer by 2000ms to transition back to idle
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.saveStatus).toBe("idle");
  });

  it("should debounce rapid value changes", () => {
    const { result, rerender } = renderHook((props) => useAutoSave(props), {
      initialProps,
    });

    // First change
    act(() => {
      result.current.handleValueChange("value 1");
    });
    expect(result.current.saveStatus).toBe("unsaved");

    rerender({ ...initialProps, value: "value 1" });
    expect(result.current.saveStatus).toBe("saving");

    // Advance timer a bit, but not fully
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Second change before the first one completes
    act(() => {
      result.current.handleValueChange("value 2");
    });
    expect(result.current.saveStatus).toBe("unsaved");

    rerender({ ...initialProps, value: "value 2" });
    expect(result.current.saveStatus).toBe("saving");

    // Advance timer by another 500ms (total 1000ms from first change)
    // The first save should have been cleared, so it should NOT be saved yet.
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.saveStatus).toBe("saving");
    expect(localStorage.getItem(storageKey)).toBeNull(); // Still null because the first timer was cleared

    // Advance to complete the second timeout
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.saveStatus).toBe("saved");
    expect(localStorage.getItem(storageKey)).toBe("value 2");
  });
});
