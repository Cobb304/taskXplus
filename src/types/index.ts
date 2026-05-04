import type React from "react";

export type Stat = {
  title: string;
  count: number;
  icon: React.ReactNode;
}

export type TaskObject = {
  id?: number;
  title: string;
  description: string | null;
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

export type Filters = {
  searchInput: string;
  completion: boolean | null;
  low: boolean;
  medium: boolean;
  high: boolean;
}
export type PrioritySelection = {
  low: boolean;
  medium: boolean;
  high: boolean;
}

export type SearchProp = {
  onClick(): void;
  onClear(): void;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  inputValue: string;
}