import { configureStore } from "@reduxjs/toolkit";
import compareProSlice, {
  addCompareProductForGuide,
} from "./features/compareProduct/compareProSlice";

const store = configureStore({
  reducer: {
    comparePro: compareProSlice,
    compareGuides: addCompareProductForGuide,
    // Add other reducers here if needed
  },
});

export default store;
