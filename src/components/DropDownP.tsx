import { useState, useRef, useEffect } from "react";
import { BiCheck, BiChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { RxCross1 } from "react-icons/rx";

export type priorityItem = {
  id: number;
  label: string;
  checked: boolean;
  checkedStyle: string;
  unCheckedStyle: string;
}

export interface DropDownProps {
  onSelect: (pSelection: priorityItem[]) => void;
}

export default function DropDownP({ onSelect, data, setData }: any): JSX.Element {

  const themeBoolean = useSelector((state: RootState) => state.theme);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  // const [priority, setPriority] = useState<number | null>(null);

  function toggleDropDown(): void {
    setIsOpen(!isOpen);
  }

  function handleItemClick(event: React.MouseEvent<HTMLLIElement, MouseEvent>, item: priorityItem) {
    setData((pervValue: priorityItem[]) => {
      const pervVal = pervValue;
      pervVal[item.id].checked = !(pervVal[item.id].checked);

      onSelect(pervVal);
      return pervVal;
    });

    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (isOpen && dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);


  const checkedClasses = "dark:bg-gray-700 bg-gray-400";
  const unCheckedClasses = "dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-400";

  return (
    <div dir="ltr" className="relative inline-block text-right font-Estedad h-12 w-full text-nowrap" ref={dropDownRef}>
      <div className="h-full w-full">
        <button type="button" onClick={toggleDropDown} aria-expanded={isOpen} aria-haspopup="true" className="cursor-pointer flex flex-row justify-center items-center h-full w-full rounded-md dark:bg-gray-800 bg-gray-300 dark:hover:bg-gray-700 hover:bg-gray-400 py-2 pr-2 pl-4 gap-2 text-md font-medium dark:text-white text-gray-950">
          <span className="">اولویت بندی</span>
          <BiChevronDown color={themeBoolean ? "white" : "#030712"} size={22} />
        </button>
      </div>
      {isOpen && (
        <div role="menu" aria-orientation="vertical" aria-labelledby="menu-button" className="origin-top-right absolute right-0 mt-2 w-56 rounded-md dark:bg-gray-800 dark:text-white bg-gray-300">
          <ul className="flex flex-col gap-1 rounded-md" role="none">
            {data.map((item: priorityItem) => (
              <li className={`${item.checked ? checkedClasses : unCheckedClasses} px-4 py-2 text-md cursor-pointer rounded-md flex flex-row-reverse items-center gap-3`} key={item.id} role="menuitem" onClick={(event) => handleItemClick(event, item)}>
                {item.label}
                {!item.checked && <button className="flex flex-row items-center justify-center w-5 h-5 dark:bg-red-600 bg-red-400 rounded-sm cursor-pointer">
                  <RxCross1 scale={22} color="white" />
                  </button>}
                {item.checked && <button className="w-5 h-5 flex items-center justify-center dark:bg-green-600 bg-green-400 rounded-sm cursor-pointer">
                  <BiCheck size={22} color="white" />
                </button>}
              </li>))}
          </ul>
        </div>
      )}
    </div>
  );
}