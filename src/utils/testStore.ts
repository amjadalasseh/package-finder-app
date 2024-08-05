import { configureStore } from "@reduxjs/toolkit";
import searchReducer, {SearchState} from "@/store/searchSlice"; 

type RootState = {
  search: SearchState; 
};

export const createTestStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: {
      search: searchReducer,
    },
    preloadedState,
  });
};
