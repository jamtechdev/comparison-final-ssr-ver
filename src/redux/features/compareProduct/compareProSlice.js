"use client";

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
      const comparedPro = {
        proName: action.payload.name,
        catID: action.payload.category_id,
        permaLink: action.payload.permalink,
        position: action.payload.position,
      };
      localStorage.setItem("catID", JSON.stringify(comparedPro.catID));
      state.compareProduct.push(comparedPro);
    },
    addCompareProductForGuide: (state, action) => {
      const comparedProGuide = {
        proName: action.payload.name,
        catID: action.payload.category_id,
        permaLink: action.payload.permalink,
        image: action.payload.main_image,
      };
      state.guideCompareProduct.push(comparedProGuide);
    },
  },
});

export const { addCompareProduct, addCompareProductForGuide } =
  compareProSlice.actions;

export default compareProSlice.reducer;
