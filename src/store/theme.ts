import { createSlice } from "@reduxjs/toolkit";

const initValues: boolean = localStorage.getItem("theme") === "false" ? false : true;

const themeSlice = createSlice({
  name: "theme",
  initialState: initValues,
  reducers: {
    changeTheme(state: boolean) {
      localStorage.setItem("theme", String(!state));
      return !state;
    }
  }
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
