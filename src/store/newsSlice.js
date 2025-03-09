import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
  name: "news",
  initialState: { value: null },

  reducers: {
    setNewsStore: (state, action) => {
      state.value = action.payload;
      console.log(state);
    },
  },
});

export const { setNewsStore } = newsSlice.actions;
export default newsSlice.reducer;
