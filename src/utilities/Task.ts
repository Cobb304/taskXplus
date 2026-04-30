import type { Priority, TaskObject, TaskT } from "../types";

export class Task implements TaskT {
  public id: number;
  public isCompleted: boolean;

  constructor(public title: string, public description: string, public priority: Priority) {
    this.id = Task.getTotalNumberOfTasksLS() + 1;
    this.isCompleted = false;
  }

  addTaskLS(): void {
    const lsTasks = localStorage.getItem("tasks");

    if (!lsTasks) {
      localStorage.setItem("tasks", JSON.stringify([this]));
    } else if (lsTasks) {
      const previousLsValue = JSON.parse(localStorage.getItem("tasks")!)
      localStorage.setItem("tasks", JSON.stringify([this, ...previousLsValue]));
    }
  }

  static getTotalNumberOfTasksLS(): number {
    let lsTasks = localStorage.getItem("tasks");
    let totalNumberOfTasks: number;

    if (lsTasks) {
      lsTasks = JSON.parse(lsTasks);
      totalNumberOfTasks = lsTasks!.length;
    } else (
      totalNumberOfTasks = 0
    )

    return totalNumberOfTasks;
  }

  static getCompletedTasks(): number {
    let lsTasks: null | string | TaskObject[] = localStorage.getItem("tasks");

    if (lsTasks) {
      lsTasks = JSON.parse(lsTasks) as TaskObject[];
      const filteredTask = lsTasks.filter((task) => task.isCompleted === true);
      return filteredTask.length;
    } else {
      return 0;
    }
  }


  static getTasksLS(argument?: number | string) {
    let lsTasks: null | string | TaskObject[] = localStorage.getItem("tasks");
    if (lsTasks) {
      lsTasks = JSON.parse(lsTasks) as TaskObject[];
    } else {
      return null;
    }

    if (!argument) {
      return lsTasks;
    } else if (typeof argument === "number") {
      const task = lsTasks.find((t) => t.id === argument);
      return task;
    } else if (typeof argument === "string") {

    } else {

    }

  }

  static editTask(id: number, newData: TaskObject) {
    let lsTasks: null | string | TaskObject[] = localStorage.getItem("tasks");
    if (lsTasks) {
      lsTasks = JSON.parse(lsTasks) as TaskObject[];
    } else {
      return null;
    }

    const oldTaskIndex = lsTasks.findIndex((t) => t.id === id);
    lsTasks[oldTaskIndex] = newData;
    localStorage.setItem("tasks", JSON.stringify(lsTasks));
    return lsTasks;
  }

  static deleteTask(id: number): TaskObject[] {
    let lsTasks: null | string | TaskObject[] = localStorage.getItem("tasks");
    if (lsTasks) {
      lsTasks = JSON.parse(lsTasks) as TaskObject[];
    }
    const newTasks = (lsTasks as TaskObject[]).filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    return newTasks;
  }

  static sortTask(newData: TaskObject[]): TaskObject[] | void {
    localStorage.setItem("tasks", JSON.stringify(newData));
    let lsTasks : null | string | TaskObject[] = localStorage.getItem("tasks");
    if (lsTasks) {
      lsTasks = JSON.parse(lsTasks) as TaskObject[];
      return lsTasks;
    }
  }
}
