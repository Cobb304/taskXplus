import { IoAdd, IoDocumentOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../store/index.ts";

export default function NoProject() {
  const themeBoolean = useSelector((state: RootState) => state.theme);

  return (<>
    <div className="flex flex-col justify-center items-center gap-5">

      <IoDocumentOutline color={themeBoolean ? "#DFF0FF" : "#6A6372"} size={50} />

      <div className="flex flex-col justify-center items-center">
        <h2 className="dark:text-white text-gray-950 font-medium text-lg gap-0">No Tasks yet?</h2>
        <p className="dark:text-gray-300 text-gray-600 text-lg">Get started by creating a new Task.</p>
      </div>

      <Link to={"/create-task"} className="bg-indigo-500 text-white font-medium text-lg py-2 px-3 rounded-md cursor-pointer hover:bg-indigo-600 flex flex-row items-center justify-around">
        <IoAdd color="white" size={28} className="pr-1.5" />
        <p>New Task</p>
      </Link>

    </div>
  </>)
}