import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../utilities/Task";
import type { Priority, TaskObject } from "../types";

const initialTasksFromLS = Task.getTasksLS();
const initValues: TaskObject[] = Array.isArray(initialTasksFromLS) ? initialTasksFromLS : [];

const dataSlice = createSlice({
  name: "data",
  initialState: initValues,
  reducers: {
    addTask(state: TaskObject[], actions: PayloadAction<{ title: string; description: string; priority: Priority }>) {
      const newTaskObject = new Task(actions.payload.title, actions.payload.description, actions.payload.priority);
      newTaskObject.addTaskLS();
      state.unshift(newTaskObject);
    },
    editTask(state: TaskObject[], actions: PayloadAction<TaskObject>) {
      const id = actions.payload.id as number;
      Task.editTask(id, {...actions.payload});
      
      const taskIndex = state.findIndex(task => task.id === id);
      state[taskIndex] = { ...state[taskIndex], ...actions.payload };
    },
    deleteTask(state: TaskObject[], actions: PayloadAction<number>) {
      const id = actions.payload as number;
      const updatedTasksArray = Task.deleteTask(id);

      state.length = 0;
      state.push(...updatedTasksArray);
    },
    sortTask(state: TaskObject[], actions: PayloadAction<TaskObject[]>) {
      const newData = actions.payload;
      const updatedTasksArray = Task.sortTask(newData);

      state.length = 0;
      state.push(...updatedTasksArray!);
    },
  }
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
