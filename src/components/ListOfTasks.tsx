import { Link } from "react-router-dom";

import type { TaskObject } from "../types";

export default function ListOfTasks({ id, title, isCompleted, priority }: TaskObject) {
  const completeClasses = "dark:bg-green-950 bg-green-300 text-green-600 dark:border-green-700 border-green-500";
  const inProgressClasses = "dark:bg-gray-800 bg-gray-300 dark:text-gray-400 text-gray-500 dark:border-gray-700 border-gray-500";

  // const lowPriority = "text-gray-400";
  // const mediumPriority = "text-yellow-900";
  // const highPriority = "text-red-900";

  return (<>
    <Link to={`/task/${id}`} className="dark:bg-gray-900 bg-gray-200 flex flex-col items-start justify-between px-4 py-4 rounded-md w-full gap-1.5 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-300">
      <div className="flex flex-row justify-start items-center w-full gap-3 shrink-0">
        <h3 className="dark:text-white text-gray-950 font-semibold text-md truncate block">{title}</h3>
        <p className={`${isCompleted ? completeClasses : inProgressClasses} border rounded-md px-1.5 py-px font-medium text-center text-sm block whitespace-nowrap`}>{isCompleted ? "Complete" : "In progress"}</p>
      </div>

      <p className="font-normal dark:text-gray-400 text-gray-800">Priority: <span className="">{priority}</span></p>
    </Link>
  </>);
}