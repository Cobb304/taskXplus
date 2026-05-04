import { useState, useRef, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export interface DropDownItems {
  id: number;
  label: string;
  checked: boolean;
}
interface DropDownProps {
  onSelect?: (id: number) => void;
}

const dropDownItems: DropDownItems[] = [
  { id: 0, label: "بدون فیلتر", checked: true },
  { id: 1, label: "کامل شده", checked: false },
  { id: 2, label: "در حال انجام", checked: false }
]

export default function DropDown({ onSelect }: DropDownProps): JSX.Element {

  const themeBoolean = useSelector((state: RootState) => state.theme);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const [completion, setCompletion] = useState<number | null>(null);
  const [ddItems, setDdItems] = useState<DropDownItems[]>(dropDownItems);

  function toggleDropDown(): void {
    setIsOpen(!isOpen);
  }

  function handleItemClick(event: React.MouseEvent<HTMLLIElement, MouseEvent>, item: DropDownItems) {
    setDdItems((pervValue) => {
      const pervVal = pervValue;
      for (let i = 0; i < pervValue.length; i++) {
        if (i === item.id) pervVal[i].checked = true;
        else pervVal[i].checked = false;
      }
      return pervVal;
    });

    setCompletion(() => {
      if (onSelect) onSelect(item.id);
      return item.id;
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
    <div className="relative inline-block text-right font-Estedad h-12 w-[41%] text-nowrap" ref={dropDownRef}>
      <div className="h-full">
        <button type="button" onClick={toggleDropDown} aria-expanded={isOpen} aria-haspopup="true" className="flex flex-row justify-center items-center h-full rounded-md dark:bg-gray-800 bg-gray-300 dark:hover:bg-gray-700 hover:bg-gray-400 py-2 pr-2 pl-4 gap-2 text-md font-medium dark:text-white text-gray-950">
          <span className=""> وضعیت تسک</span>
          <BiChevronDown color={themeBoolean ? "white" : "#030712"} size={22} />
        </button>
      </div>
      {isOpen && (
        <div role="menu" aria-orientation="vertical" aria-labelledby="menu-button" className="origin-top-right absolute right-0 mt-2 w-56 rounded-md dark:bg-gray-800 dark:text-white bg-gray-300">
          <ul className="flex flex-col gap-1 rounded-md" role="none">
            {ddItems.map(item => (
              <li className={`${item.checked ? checkedClasses : unCheckedClasses} block px-4 py-2 text-md cursor-pointer rounded-md`} key={item.id} role="menuitem" onClick={(event) => handleItemClick(event, item)}>
                {item.label}
              </li>))}
          </ul>
        </div>
      )}
    </div>
  );
}