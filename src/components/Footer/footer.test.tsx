import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./index";
// import '@testing-library/jest-dom/extend-expect';

describe("Footer Component", () => {
  it("renders the footer component correctly", () => {
    render(<Footer />);

    // Ensure specific elements are found and not duplicated
    const aboutHeading = screen.getByRole("heading", { name: /About Us/i });
    expect(aboutHeading).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: /Home/i });
    expect(homeLink).toBeInTheDocument();

    const servicesLink = screen.getByRole("link", { name: /Services/i });
    expect(servicesLink).toBeInTheDocument();

    const contactLink = screen.getByRole("link", { name: /Contact/i });
    expect(contactLink).toBeInTheDocument();

    const aboutLink = screen.getByRole("link", { name: /About/i });
    expect(aboutLink).toBeInTheDocument();

    const facebookIcon = screen.getByLabelText(/Facebook/i);
    expect(facebookIcon).toBeInTheDocument();

    const twitterIcon = screen.getByLabelText(/Twitter/i);
    expect(twitterIcon).toBeInTheDocument();

    const instagramIcon = screen.getByLabelText(/Instagram/i);
    expect(instagramIcon).toBeInTheDocument();
  });
});
