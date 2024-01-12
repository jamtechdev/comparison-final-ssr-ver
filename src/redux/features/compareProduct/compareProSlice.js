import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  compareProduct: [],
  guideCompareProduct: [],
};
export const compareProSlice = createSlice({
  name: "compareProduct",
  initialState,
  reducers: {
    addCompareProduct: (state, action) => {
      state.compareProduct = [];
      state.compareProduct.push(action.payload);
    },
    updateCompareProduct: (state, action) => {
      const { key, data } = action.payload || {};
      console.log(key)
      // Check if key is defined and data is an object
      if (key && typeof data === 'object') {
        if (key === "productSecond") {
          state.compareProduct[0].productSecond = data
        }
        if (key === "productThird") {
          state.compareProduct[0].productThird = data
        }
      }
    },
    addCompareProductForGuide: (state, action) => {
      const comparedProGuide = {
        name: action.payload.name,
        category_id: action.payload.category_id,
        category_url: action.payload.category_url,
        permalink: action.payload.permalink,
        image: action.payload.image
      };
      state.guideCompareProduct.push(comparedProGuide);
    },
  },
});

export const { addCompareProduct, addCompareProductForGuide, updateCompareProduct } =
  compareProSlice.actions;

export default compareProSlice.reducer;
