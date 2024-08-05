import React from "react";
import { render, screen } from "@testing-library/react";
import SkeletonModule from "./SkeletonModule";

describe("SkeletonModule Component", () => {
  it("renders the skeleton module with correct structure", () => {
    render(<SkeletonModule />);

    // Check if the skeleton-module container is in the document
    const skeletonModule = screen.getByTestId("skeleton-module");
    expect(skeletonModule).toBeInTheDocument();

    // Check if the skeleton-title element is present
    const skeletonTitle = screen.getByText("", { selector: ".skeleton-title" });
    expect(skeletonTitle).toBeInTheDocument();

    // Check if the skeleton-description element is present
    const skeletonDescription = screen.getByText("", {
      selector: ".skeleton-description",
    });
    expect(skeletonDescription).toBeInTheDocument();

    // Check if the skeleton-details container is present
    const skeletonDetails = screen.getByText("", {
      selector: ".skeleton-details",
    });
    expect(skeletonDetails).toBeInTheDocument();

    // Check if the skeleton-detail elements are present
    const skeletonDetailElements = screen.getAllByText("", {
      selector: ".skeleton-detail",
    });
    expect(skeletonDetailElements.length).toBe(3);

    // Check if the skeleton-link element is present
    const skeletonLink = screen.getByText("", { selector: ".skeleton-link" });
    expect(skeletonLink).toBeInTheDocument();
  });
});
