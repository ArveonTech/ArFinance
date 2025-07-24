import { configureStore } from "@reduxjs/toolkit";
import financeDataSlice from "../components/features/financeDataSlice";
import { loadFromLocalStorage, saveToLocalStorage } from "../hooks/local";
import createStatusSlice from "../components/features/createStatusSlice";

const financeDataLocal = loadFromLocalStorage();

let preloadedState = {};

if (financeDataLocal) {
  preloadedState.financeData = financeDataLocal;
}

export const store = configureStore({
  reducer: {
    financeData: financeDataSlice,
    createStatus: createStatusSlice,
  },
  preloadedState,
});

if (!financeDataLocal) {
  saveToLocalStorage(store.getState().financeData);
}

store.subscribe(() => {
  saveToLocalStorage(store.getState().financeData);
});
