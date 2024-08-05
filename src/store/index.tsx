// import searchSlice from "./slice";
// import { combineReducers, configureStore } from "@reduxjs/toolkit";

// const rootReducer = combineReducers({
//   // searchSlice: searchSlice,

// });

// export const setupStore = (preloadedState?: Partial<RootState>) => {
//   return configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: false,
//       }),
//     preloadedState,
//   });
// };
// export const store = setupStore();

// export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof setupStore>;
// export type AppDispatch = AppStore["dispatch"];

import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

// Export the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
