// Search.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createTestStore } from "../../utils/testStore"; // Adjust the import path to where you defined createTestStore
import Search from "./index"; // Adjust the import path to your Search component
import { fetchModules, setCurrentPage } from "@/store/searchSlice";

describe("Search Component", () => {
  let store: ReturnType<typeof createTestStore>;
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    store = createTestStore({
      search: {
        results: [],
        totalRecords: 0,
        loading: false,
        error: null,
        currentPage: 1,
      },
    });

    store.dispatch = dispatch; // Mock dispatch function
  });

  it("renders the search input and filters", () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );

    // Check for the search input
    const searchInput = screen.getByPlaceholderText("Search for modules");
    expect(searchInput).toBeInTheDocument();

    // Check for dropdowns (select elements) by their role and name
    // Adjust the name to match the actual text of the options if necessary
    // const languageFilter = screen.getByRole('combobox', { name: /All Languages/});
    // expect(languageFilter).toBeInTheDocument();

    // const licenseFilter = screen.getByRole('combobox', { name: /All Licenses/i });
    // expect(licenseFilter).toBeInTheDocument();

    // const platformFilter = screen.getByRole('combobox', { name: /All Platforms/i });
    // expect(platformFilter).toBeInTheDocument();
    // expect(screen.getByRole('select', { name: /All Languages/i })).toBeInTheDocument();
    // Check for the search button
    const searchButton = screen.getByRole("button", { name: /Search/i });
    expect(searchButton).toBeInTheDocument();
  });

  it("dispatches fetchModules action on search form submission", async () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );

    // Change input and submit form
    fireEvent.change(screen.getByPlaceholderText("Search for modules"), {
      target: { value: "react" },
    });
    fireEvent.click(screen.getByText("Search"));

    // Wait for dispatch calls to occur
    await waitFor(() => {
      // Ensure setCurrentPage action is dispatched
      expect(dispatch).toHaveBeenCalledWith(setCurrentPage(1));
    });
  });

  it("renders the loading skeleton when loading is true", () => {
    store = createTestStore({
      search: {
        results: [],
        totalRecords: 0,
        loading: true,
        error: null,
        currentPage: 1,
      },
    });

    render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );

    expect(screen.getAllByTestId("skeleton-module").length).toBe(10);
  });

  it("renders the error message when error is not null", () => {
    store = createTestStore({
      search: {
        results: [],
        totalRecords: 0,
        loading: false,
        error: "An error occurred",
        currentPage: 1,
      },
    });

    render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );

    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });

  it("renders the search results when loading is false and there are results", () => {
    store = createTestStore({
      search: {
        results: [
          {
            name: "module1",
            description: "Module 1 description",
            language: "JavaScript",
            platform: "npm",
            license: "MIT",
            homepage: "https://module1.com",
          },
          {
            name: "module2",
            description: "Module 2 description",
            language: "Python",
            platform: "pypi",
            license: "Apache-2.0",
            homepage: "https://module2.com",
          },
        ],
        totalRecords: 2,
        loading: false,
        error: null,
        currentPage: 1,
      },
    });

    render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );

    expect(screen.getByText("module1")).toBeInTheDocument();
    expect(screen.getByText("Module 1 description")).toBeInTheDocument();
    // expect(screen.getByText('JavaScript')).toBeInTheDocument();
    // expect(screen.getByText('module2')).toBeInTheDocument();
    // expect(screen.getByText('Module 2 description')).toBeInTheDocument();
    // expect(screen.getByText('Python')).toBeInTheDocument();
  });
});
