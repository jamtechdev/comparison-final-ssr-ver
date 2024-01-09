import { configureStore } from "@reduxjs/toolkit";
import compareProSlice from "./features/compareProduct/compareProSlice";

const store = configureStore({
  reducer: {
    comparePro: compareProSlice,
    // Add other reducers here if needed
  },
});

export default store;
