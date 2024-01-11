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

export const { addCompareProduct, addCompareProductForGuide } =
  compareProSlice.actions;

export default compareProSlice.reducer;
