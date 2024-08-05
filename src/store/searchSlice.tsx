import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchModulesAPI, Module, Filters } from "@/utils/api";

interface FetchModulesArgs {
  query: string;
  page: number;
  filters: Filters;
}

export interface SearchState {
  results: Module[];
  totalRecords: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
}

const initialState: SearchState = {
  results: [],
  totalRecords: 0,
  loading: false,
  error: null,
  currentPage: 1,
};

const resultsPerPage = 10;

export const fetchModules = createAsyncThunk<
  { data: Module[]; totalRecords: number },
  FetchModulesArgs,
  { rejectValue: string }
>(
  "search/fetchModules",
  async ({ query, page, filters }, { rejectWithValue }) => {
    try {
      const { data, totalRecords } = await fetchModulesAPI({
        query,
        page,
        filters,
        resultsPerPage,
      });

      return { data, totalRecords };
    } catch (error) {
      return rejectWithValue("Failed to fetch modules");
    }
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.data;
        state.totalRecords = action.payload.totalRecords;
      })
      .addCase(fetchModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch data";
      });
  },
});

export const { setCurrentPage } = searchSlice.actions;
export default searchSlice.reducer;
