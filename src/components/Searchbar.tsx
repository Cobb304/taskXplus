import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";

import type { RootState } from "../store";
import type { SearchProp } from "../types";
import { RxCross1 } from "react-icons/rx";

export default function Searchbar({ onClick, onChange, onClear, inputValue }: SearchProp) {
  const themeBoolean = useSelector((state: RootState) => state.theme);

  return (<>
    <div className="flex flex-row justify-between items-center w-full">
      <div className="dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-300 cursor-pointer hover:bg-gray-400 h-12 flex justify-center items-center px-3 rounded-l-md" onClick={onClick}>
        <BiSearch color={themeBoolean ? "white" : "#030712"} size={26} />
      </div>

      <div onClick={onClear} className="dark:bg-gray-900 dark:hover:bg-gray-700 bg-gray-200 cursor-pointer hover:bg-gray-400 h-12 flex justify-center items-center px-3">
        <RxCross1 color={themeBoolean ? "white" : "#030712"} size={26} />
      </div>

      <input onChange={(event) => onChange(event)} type="text" name="search" value={inputValue} placeholder="جستجو" dir="rtl" className="dark:bg-gray-900 bg-gray-200 dark:text-white text-black dark:placeholder:text-gray-300 placeholder:text-gray-600 h-12 w-full rounded-r-md px-6 pb-1 focus:border-red-500 font-Estedad" />
    </div>
  </>);
}
