import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import LazyImage from "./index";

// Mocking the global Image constructor
global.Image = class extends Image {
  constructor() {
    super();
    setTimeout(() => {
      if (this.onload) this.onload(new Event("load"));
    }, 0);
  }
};

describe("LazyImage Component", () => {
  const src = "https://via.placeholder.com/150";
  const alt = "Placeholder Image";

  it("displays a loading spinner initially", () => {
    render(<LazyImage src={src} alt={alt} className="test-class" />);

    // Check if the spinner is in the document initially
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });

  it("renders the image after it has loaded", async () => {
    render(<LazyImage src={src} alt={alt} className="test-class" />);

    // Wait for the image to be loaded
    const image = await screen.findByAltText(alt);

    // Ensure the image is in the document and has the correct src attribute
    expect(image).toBeInTheDocument();
    await waitFor(() => expect(image).toHaveAttribute("src", src));

    // Ensure the spinner is not present after the image loads
    const spinner = screen.queryByRole("status");
    expect(spinner).not.toBeInTheDocument();
  });
});
