import { configureStore } from "@reduxjs/toolkit";
import recentlyViewedReducer from "./recentlyViewedSlice";

export const store = configureStore({
   reducer: {
      recentlyViewed: recentlyViewedReducer,

   }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;