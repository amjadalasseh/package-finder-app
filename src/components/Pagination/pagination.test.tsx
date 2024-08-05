import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./index"; // Adjust this import based on your file structure

describe("Pagination Component", () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it("renders pagination buttons correctly", () => {
    render(
      <Pagination
        totalPages={10}
        currentPage={5}
        onPageChange={mockOnPageChange}
      />,
    );

    // Check that the pagination buttons are rendered correctly
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Last")).toBeInTheDocument();

    // Check that the correct page numbers are displayed
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it('disables the "First" and "Previous" buttons on the first page', () => {
    render(
      <Pagination
        totalPages={10}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.getByText("First")).toBeDisabled();
    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).not.toBeDisabled();
    expect(screen.getByText("Last")).not.toBeDisabled();
  });

  it('disables the "Next" and "Last" buttons on the last page', () => {
    render(
      <Pagination
        totalPages={10}
        currentPage={10}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.getByText("First")).not.toBeDisabled();
    expect(screen.getByText("Previous")).not.toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
    expect(screen.getByText("Last")).toBeDisabled();
  });

  it("calls onPageChange with the correct page number when a button is clicked", () => {
    render(
      <Pagination
        totalPages={10}
        currentPage={5}
        onPageChange={mockOnPageChange}
      />,
    );

    fireEvent.click(screen.getByText("Next"));
    expect(mockOnPageChange).toHaveBeenCalledWith(6);

    fireEvent.click(screen.getByText("Previous"));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);

    fireEvent.click(screen.getByText("First"));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText("Last"));
    expect(mockOnPageChange).toHaveBeenCalledWith(10);

    fireEvent.click(screen.getByText("7"));
    expect(mockOnPageChange).toHaveBeenCalledWith(7);
  });
});
