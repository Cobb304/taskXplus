import { Link } from "react-router-dom";

import type { TaskObject } from "../types";

export default function ListOfTasks({ id, title, isCompleted, description }: TaskObject) {
  const completeClasses = "dark:bg-green-950 bg-green-300 text-green-600 dark:border-green-700 border-green-500";
  const inProgressClasses = "dark:bg-gray-800 bg-gray-300 dark:text-gray-400 text-gray-500 dark:border-gray-700 border-gray-500";

  return (<>
    <Link to={`/task/${id}`} className="dark:bg-gray-900 bg-gray-200 flex flex-col items-end justify-around px-4 py-3 rounded-md w-full gap-3 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-300 font-Estedad">
      <div className="flex flex-row-reverse justify-start items-center w-full gap-3 shrink-0">
        <h3 className="dark:text-white text-gray-950 font-semibold text-md truncate block">{title}</h3>
        <p className={`${isCompleted ? completeClasses : inProgressClasses} border rounded-md px-1.5 py-px font-medium text-center text-sm block whitespace-nowrap`}>{isCompleted ? "کامل شده" : "در حال انجام"}</p>
      </div>

      {description && <p dir="rtl" className="font-normal dark:text-gray-400 text-gray-600 flex-row justify-start gap-1 flex w-full">توضیح:<span className="dark:text-gray-300 text-gray-700 text-right truncate">{description}</span></p>}
      {!description && <p className="font-normal dark:text-gray-400 text-gray-600 flex flex-row-reverse justify-end gap-1">:توضیح <span className="dark:text-gray-400 text-gray-600 italic">بدون توضیح</span></p>}
    </Link>
  </>);
}