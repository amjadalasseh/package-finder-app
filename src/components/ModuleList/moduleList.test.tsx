import React from "react";
import { render, screen } from "@testing-library/react";
import ModuleList from "./index";
import { Module } from "@/utils/api";

describe("ModuleList Component", () => {
  const modules: Module[] = [
    {
      name: "module1",
      owner: "owner1",
      stars: 100,
      description: "",
      homepage: "",
      language: "",
      platform: "",
      license: "",
    },
    {
      name: "module2",
      owner: "owner2",
      stars: 200,
      description: "",
      homepage: "",
      language: "",
      platform: "",
      license: "",
    },
    {
      name: "module3",
      owner: "owner3",
      stars: 300,
      description: "",
      homepage: "",
      language: "",
      platform: "",
      license: "",
    },
  ];

  it("renders a list of modules", () => {
    render(<ModuleList modules={modules} />);

    // Check that each module name is rendered
    modules.forEach((module) => {
      const moduleName = screen.getByText(module.name);
      expect(moduleName).toBeInTheDocument();

      const moduleOwner = screen.getByText(`Owner: ${module.owner}`);
      expect(moduleOwner).toBeInTheDocument();

      const moduleStars = screen.getByText(`Stars: ${module.stars}`);
      expect(moduleStars).toBeInTheDocument();
    });
  });

  it("renders an empty list when no modules are provided", () => {
    render(<ModuleList modules={[]} />);

    // Check that the list is empty
    const listItems = screen.queryAllByRole("listitem");
    expect(listItems.length).toBe(0);
  });
});
