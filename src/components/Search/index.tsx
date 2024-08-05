"use client";

import "./Search.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchModules, setCurrentPage } from "@/store/searchSlice";
import SkeletonModule from "./SkeletonModule";
import Pagination from "@/components/Pagination";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [languageFilter, setLanguageFilter] = useState<string>("");
  const [licenseFilter, setLicenseFilter] = useState<string>("");
  const [platformFilter, setPlatformFilter] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  // Access state from Redux store
  const { results, totalRecords, loading, error, currentPage } = useSelector(
    (state: RootState) => state.search,
  );

  const resultsPerPage = 10;
  const totalPages = Math.ceil(totalRecords / resultsPerPage);

  useEffect(() => {
    if (query) {
      dispatch(
        fetchModules({
          query,
          page: currentPage,
          filters: {
            languages: languageFilter,
            licenses: licenseFilter,
            platforms: platformFilter,
          },
        }),
      );
    }
  }, [
    query,
    currentPage,
    languageFilter,
    licenseFilter,
    platformFilter,
    dispatch,
  ]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setCurrentPage(1)); // Reset to first page on new search
    dispatch(
      fetchModules({
        query,
        page: 1,
        filters: {
          languages: languageFilter,
          licenses: licenseFilter,
          platforms: platformFilter,
        },
      }),
    );
  };

  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for modules"
          className="search-input"
        />

        <div className="filter-group">
          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Languages</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Ruby">Ruby</option>
          </select>

          <select
            value={licenseFilter}
            onChange={(e) => setLicenseFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Licenses</option>
            <option value="MIT">MIT</option>
            <option value="Apache-2.0">Apache-2.0</option>
            <option value="GPL-3.0">GPL-3.0</option>
          </select>

          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Platforms</option>
            <option value="npm">npm</option>
            <option value="pypi">pypi</option>
            <option value="rubygems">RubyGems</option>
          </select>
        </div>

        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && (
        <div className="skeleton-list">
          {Array.from({ length: 10 }, (_, i) => (
            <SkeletonModule key={i} />
          ))}
        </div>
      )}
      {error && <div className="error-message">{error}</div>}

      <div className="results">
        {!loading &&
          results.map((module, i) => (
            <div key={module.name + i} className="module-item">
              <h3>{module.name}</h3>
              <p>{module.description}</p>
              <p>
                <strong>Language:</strong> {module.language}
              </p>
              <p>
                <strong>Platform:</strong> {module.platform}
              </p>
              <p>
                <strong>License:</strong> {module.license}
              </p>
              <a
                href={module.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                Homepage
              </a>
            </div>
          ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Search;
