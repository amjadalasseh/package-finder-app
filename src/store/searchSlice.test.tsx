import { configureStore } from '@reduxjs/toolkit';
import searchReducer, { fetchModules, setCurrentPage } from './searchSlice';
import { fetchModulesAPI } from '@/utils/api';

jest.mock('../utils/api', () => ({
  fetchModulesAPI: jest.fn(),
}));

describe('searchSlice', () => {
  const store = configureStore({ reducer: { search: searchReducer } });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle initial state', () => {
    const state = store.getState().search;
    expect(state).toEqual({
      results: [],
      totalRecords: 0,
      loading: false,
      error: null,
      currentPage: 1,
    });
  });

  it('should handle setCurrentPage', () => {
    store.dispatch(setCurrentPage(2));
    const state = store.getState().search;
    expect(state.currentPage).toBe(2);
  });

  describe('fetchModules thunk', () => {
    it('should handle successful fetchModules', async () => {
      const mockData = {
        data: [
          { name: 'Module 1', description: 'Description 1', homepage: 'http://example.com', language: 'JavaScript', platform: 'npm', license: 'MIT', owner: 'Owner', stars: '5' },
        ],
        totalRecords: 100,
      };

      (fetchModulesAPI as jest.Mock).mockResolvedValue(mockData);

      await store.dispatch(fetchModules({ query: 'test', page: 1, filters: { languages: 'JavaScript', licenses: 'MIT', platforms: 'npm' }, resultsPerPage: 10 }));

      const state = store.getState().search;

      expect(state.loading).toBe(false);
      expect(state.results).toEqual(mockData.data);
      expect(state.totalRecords).toBe(mockData.totalRecords);
      expect(state.error).toBe(null);
    });

    it('should handle failed fetchModules', async () => {
      (fetchModulesAPI as jest.Mock).mockRejectedValue(new Error('Failed to fetch modules'));

      await store.dispatch(fetchModules({ query: 'test', page: 1, filters: { languages: 'JavaScript', licenses: 'MIT', platforms: 'npm' } }));

      const state = store.getState().search;

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Failed to fetch modules');
    });
  });
});
