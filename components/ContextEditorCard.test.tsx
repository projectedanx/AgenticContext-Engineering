import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ContextEditorCard } from "./ContextEditorCard";

describe("ContextEditorCard", () => {
  const defaultProps = {
    title: "Test Card Title",
    icon: <span data-testid="test-icon">icon</span>,
  };

  it("renders the title and icon correctly", () => {
    render(
      <ContextEditorCard {...defaultProps}>
        <div data-testid="test-children">Child content</div>
      </ContextEditorCard>,
    );

    expect(screen.getByText("Test Card Title")).toBeInTheDocument();
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(
      <ContextEditorCard {...defaultProps}>
        <div data-testid="test-children">Child content</div>
      </ContextEditorCard>,
    );

    expect(screen.getByTestId("test-children")).toBeInTheDocument();
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("renders the statusIndicator when provided", () => {
    render(
      <ContextEditorCard
        {...defaultProps}
        statusIndicator={<span data-testid="status-indicator">Active</span>}
      >
        <div>Content</div>
      </ContextEditorCard>,
    );

    expect(screen.getByTestId("status-indicator")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("does not render statusIndicator when not provided", () => {
    render(
      <ContextEditorCard {...defaultProps}>
        <div>Content</div>
      </ContextEditorCard>,
    );

    expect(screen.queryByTestId("status-indicator")).not.toBeInTheDocument();
  });
});
