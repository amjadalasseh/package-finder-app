import { fetchModulesAPI, Module } from './api'; 
import { variables } from "@/utils/config";

// Mock the `fetch` global function
global.fetch = jest.fn();

describe('fetchModulesAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock data
  });

  it('should construct the URL and fetch data correctly', async () => {
    // Mock fetch response
    const mockResponse = {
      json: jest.fn().mockResolvedValue([{ name: 'Module 1', description: 'Description', homepage: 'http://example.com', language: 'JavaScript', platform: 'npm', license: 'MIT', owner: 'Owner', stars: '5' }]),
      headers: new Map([['total', '100']]),
      ok: true
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const query = 'test';
    const page = 1;
    const filters = { languages: 'JavaScript', licenses: 'MIT', platforms: 'npm' };
    const resultsPerPage = 10;

    const result = await fetchModulesAPI({ query, page, filters, resultsPerPage });

    // Assert the URL construction
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(`q=${query}`));
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(`per_page=${resultsPerPage}`));
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(`page=${page}`));
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(`api_key=${variables.key}`));
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(`languages=${filters.languages}`));
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(`licenses=${filters.licenses}`));
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(`platforms=${filters.platforms}`));

    // Assert the response
    expect(result).toEqual({
      data: [{ name: 'Module 1', description: 'Description', homepage: 'http://example.com', language: 'JavaScript', platform: 'npm', license: 'MIT', owner: 'Owner', stars: '5' }],
      totalRecords: 100
    });
  });

  it('should throw an error if the response is not ok', async () => {
    // Mock fetch response with an error
    const mockResponse = {
      json: jest.fn().mockResolvedValue({}),
      headers: new Map(),
      ok: false,
      statusText: 'Not Found'
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const query = 'test';
    const page = 1;
    const filters = { languages: '', licenses: '', platforms: '' };
    const resultsPerPage = 10;

    await expect(fetchModulesAPI({ query, page, filters, resultsPerPage }))
      .rejects
      .toThrow('Error: Not Found');
  });
});
