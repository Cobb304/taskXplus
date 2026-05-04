import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiCheck } from "react-icons/bi";

import type { TaskObject } from "../types";
import type { RootState } from "../store";
import { dataActions } from "../store/data";

export default function ListOfTasks({ id, title, isCompleted, description, priority }: TaskObject) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState<boolean>(isCompleted);
  const allTasks = useSelector((state: RootState) => state.data);

  const completeClasses = "dark:bg-green-950 bg-green-300 text-green-600 dark:border-green-700 border-green-500";
  const inProgressClasses = "dark:bg-gray-800 bg-gray-300 dark:text-gray-400 text-gray-500 dark:border-gray-700 border-gray-500";

  function handleCheck(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, checked: boolean) {
    event.stopPropagation();
    setIsChecked(() => {
      const newTask: TaskObject = { id, title, description, isCompleted: checked, priority }
      dispatch(dataActions.editTask(newTask));

      return checked;
    });
  }

  function handleNaviagte() {
    navigate(`task/${id}`);
  }

  return (<>
    <div onClick={handleNaviagte} className="dark:bg-gray-900 bg-gray-200 flex flex-row-reverse items-center justify-between px-4 py-3 rounded-md w-full gap-3 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-300 font-Estedad">
      <div className="flex flex-col items-end justify-around gap-2 w-[90%]">
        <div className="flex flex-row-reverse justify-start items-center w-full gap-3 shrink-0">
          <h3 className="dark:text-white text-gray-950 font-semibold text-md truncate block">{title}</h3>
          <p className={`${isCompleted ? completeClasses : inProgressClasses} border rounded-md px-1.5 py-px font-medium text-center text-sm block whitespace-nowrap`}>{isCompleted ? "کامل شده" : "در حال انجام"}</p>
        </div>

        {description && <p dir="rtl" className="font-normal dark:text-gray-400 text-gray-600 flex-row justify-start gap-1 flex w-full">توضیح:<span className="dark:text-gray-300 text-gray-700 text-right truncate">{description}</span></p>}
        {!description && <p className="font-normal dark:text-gray-400 text-gray-600 flex flex-row-reverse justify-end gap-1">:توضیح <span className="dark:text-gray-400 text-gray-600 italic">بدون توضیح</span></p>}
      </div>

      <div className="flex flex-row items-center w-[10%]">
        {!isChecked && <button onClick={(event) => handleCheck(event, true)} className="w-5 h-5 dark:bg-white bg-gray-700 dark:hover:bg-green-300 hover:bg-green-700 rounded-sm cursor-pointer"></button>}
        {isChecked && <button onClick={(event) => handleCheck(event, false)} className="w-5 h-5 flex items-center justify-center dark:bg-green-600 bg-green-400 dark:hover:bg-green-700 hover:bg-green-300 rounded-sm cursor-pointer">
          <BiCheck size={22} color="white" />
        </button>}
      </div>
    </div>
  </>);
}