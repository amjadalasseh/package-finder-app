import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./index";

describe("Header Component", () => {
  it("renders the header component correctly", () => {
    render(<Header />);

    // Check for the logo image
    const logoImage = screen.getByAltText("bower-logo");
    expect(logoImage).toBeInTheDocument();

    // Check for the brand title
    const brandTitle = screen.getByRole("heading", { name: /Bower/i });
    expect(brandTitle).toBeInTheDocument();

    // Check for the tagline
    const tagline = screen.getByText(/A package manager for the web/i);
    expect(tagline).toBeInTheDocument();

    // Check for navigation links
    const homeLink = screen.getByRole("link", { name: /Home/i });
    expect(homeLink).toBeInTheDocument();

    const contactLink = screen.getByRole("link", { name: /Contact/i });
    expect(contactLink).toBeInTheDocument();

    const aboutLink = screen.getByRole("link", { name: /About/i });
    expect(aboutLink).toBeInTheDocument();
  });
});
