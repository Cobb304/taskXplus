import { IoAdd, IoDocumentOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../store/index.ts";

export default function NoProject() {
  const themeBoolean = useSelector((state: RootState) => state.theme);

  return (<>
    <div className="flex flex-col justify-center items-center gap-5">

      <IoDocumentOutline color={themeBoolean ? "#DFF0FF" : "#6A6372"} size={50} />

      <div className="flex flex-col gap-1 justify-center items-center font-Estedad">
        <h2 className="dark:text-white text-gray-950 font-bold text-lg">میخوای تسک جدید بسازی؟</h2>
        <p className="dark:text-gray-300 text-gray-600 text-lg">.ففط کافیه روی دکمه زیر کلیک کنی</p>
      </div>

      <Link to={"/create-task"} className="bg-indigo-500 font-Estedad font-md gap-2 text-white text-lg py-2 px-2 rounded-md cursor-pointer hover:bg-indigo-600 flex flex-row items-center justify-around">
        <p>تسک جدید</p>
        <IoAdd color="white" size={28} className="" />
      </Link>

    </div>
  </>)
}