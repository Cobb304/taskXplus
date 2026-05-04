import { useState } from "react";
import type { PrioritySelection } from "../types";

type priorityItem = {
  id: number;
  label: string;
  checked: boolean;
  checkedStyle: string;
  unCheckedStyle: string;
}

const pList: priorityItem[] = [
  { id: 0, label: "زیاد", checked: true, checkedStyle: "dark:bg-white dark:text-red-500 bg-gray-950 text-red-500", unCheckedStyle: "dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-500 dark:bg-gray-900 bg-gray-300 hover:bg-gray-400" },
  { id: 1, label: "متوسط", checked: true, checkedStyle: "dark:bg-white dark:text-yellow-500 bg-gray-950 text-yellow-500", unCheckedStyle: "dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-500 dark:bg-gray-900 bg-gray-300 hover:bg-gray-400" },
  { id: 2, label: "کم", checked: true, checkedStyle: "dark:bg-white dark:text-blue-500 bg-gray-950 text-blue-500", unCheckedStyle: "dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-500 dark:bg-gray-900 bg-gray-300 hover:bg-gray-400" }
]

export default function PriorityBar({ onClick }: any) {
  const [priorityValue, setPriorityValue] = useState<priorityItem[]>(pList);

  function handleOnClick(item: priorityItem) {
    setPriorityValue((pervValue) => {
      const pervVal = pervValue;
      pervVal[item.id].checked = !(pervVal[item.id].checked);

      const pSelection: PrioritySelection = {
        low: pervVal[2].checked,
        medium: pervVal[1].checked,
        high: pervVal[0].checked
      };
      onClick(pSelection);

      return pervVal;
    });
  }

  return (<div className="dark:bg-gray-800 bg-gray-200 h-full w-full flex flex-row-reverse items-center font-Estedad p-2">
    <p className="dark:text-gray-300 text-normal px-4">اولویت</p>

    <ul className="w-full flex flex-row items-center gap-2">
      {priorityValue.map(item => (
        <li key={item.id} onClick={() => handleOnClick(item)} className={`${item.checked ? item.checkedStyle : item.unCheckedStyle} rounded-md py-2 cursor-pointer w-full text-center font-semibold`}>{item.label}</li>
      ))}
    </ul>
  </div>);
}