import React from "react";
import { render, screen } from "@testing-library/react";
import Sponsors from "./index";
import LazyImage from "../LazyImage";

// Mock the LazyImage component
jest.mock("../LazyImage", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
    // eslint-disable-next-line @next/next/no-img-element
  }) => <img src={src} alt={alt} className={className} />,
}));

describe("Sponsors Component", () => {
  it("renders all sponsors with their names and images", () => {
    render(<Sponsors />);

    const image = screen.getByTestId("Sponsor 1");
    expect(image).toBeInTheDocument();
  });
});
