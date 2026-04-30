import type React from "react";

export type Stat = {
  title: string;
  count: number;
  icon: React.ReactNode;
}

export type TaskObject = {
  id?: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: Priority;
}

export type Priority = "Low" | "Medium" | "High";
export interface TaskT {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: Priority;

  addTaskLS(): void;
}

export type Theme = "" | "dark";
