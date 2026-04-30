import { useSelector } from "react-redux";
import { IoFileTrayFull } from "react-icons/io5";

import type { RootState } from "../store/index.ts";

export default function NoList() {
  const themeBoolean = useSelector((state: RootState) => state.theme);

  return (<>
    <div className="flex flex-col justify-center items-center dark:bg-gray-950 bg-white w-full h-[20%] rounded-md border-dashed border-gray-700 border-2">
      <IoFileTrayFull color={themeBoolean ? "gray" : "black"} size={40} />
      <h2 className="text-md font-medium dark:text-gray-400 text-gray-700">List of Tasks is empty.</h2>
    </div>
  </>);
}