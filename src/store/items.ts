import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Filters, TaskObject } from "../types";
import { Task } from "../utilities/Task";

if (!localStorage.getItem("tasks")) localStorage.setItem("tasks", "[]");

const initValues: TaskObject[] = Task.getTasksLS() as TaskObject[];
const itemsSlice = createSlice({
  name: "items",
  initialState: initValues,
  reducers: {
    getFilteredItems(state: TaskObject[], actions:PayloadAction<{ allTasks: TaskObject[], filters: Filters }>) {
      const allTasks = actions.payload.allTasks;
      const filters = actions.payload.filters;
      let filteredItems = allTasks;

      if (filters.completion === null) {
        filteredItems = allTasks;
      } else if (filters.completion === true) {
        filteredItems = allTasks.filter(item => item.isCompleted === true);
      } else if (filters.completion === false) {
        filteredItems = allTasks.filter(item => item.isCompleted === false);
      }

      if (filters.searchInput.trim() !== "") {
        filteredItems = filteredItems.filter(item => item.title.toLowerCase().includes(filters.searchInput.toLowerCase().trim()));
      }

      state.length = 0;
      state.push(...filteredItems);
    }
  }
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice.reducer;