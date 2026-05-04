import { configureStore } from "@reduxjs/toolkit";

import dataReducers from "./data.ts";
import themeReducers from "./theme.ts";
import itemsReducers from "./items.ts";

const store = configureStore({
  reducer: { data: dataReducers, theme: themeReducers, items: itemsReducers }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
