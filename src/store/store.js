import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import newsReducer from "./newsSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    news: newsReducer,
  },
});

export default store;
