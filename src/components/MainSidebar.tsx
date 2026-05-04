import { IoDocumentText, IoMoon, IoTrash } from "react-icons/io5";
import { IoMdClock, IoMdDoneAll } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

import Stats from "./Stats.tsx";
import Logo from "./Logo.tsx";
import type { RootState } from "../store/index.ts";
import { themeActions } from "../store/theme.ts";

export default function MainSidebar() {
  const dispatch = useDispatch();
  const allTasks = useSelector((state: RootState) => state.data);
  const completedTasks = (allTasks.filter((task) => task.isCompleted === true).length);
  const onGoingTasks = allTasks.length - completedTasks;
  const themeBoolean = useSelector((state: RootState) => state.theme);

  function handleThemeChange() {
    dispatch(themeActions.changeTheme());
  }

  return (<>
    <div className="bg-white dark:bg-gray-950 w-full h-screen flex flex-col justify-between">

      <div className="flex flex-row items-center justify-between w-full py-3 px-5 border-b border-b-gray-800">
        <Logo />
        {/* <CreateTaskButton /> */}
      </div>

      <div className="flex flex-col grow mt-2 mx-2 gap-2 font-Estedad">
        <Stats title="تعداد تسک ها" count={allTasks.length} icon={<IoDocumentText color="white" size={40} />} />
        <Stats title="تسک های انجام شده" count={completedTasks} icon={<IoMdDoneAll color="white" size={40} />} />
        <Stats title="تسک های در حال انجام" count={onGoingTasks} icon={<IoMdClock color="white" size={40} />} />
      </div>

      <div className="flex flex-row justify-start py-5 px-5 gap-4 border-t border-t-gray-800">
        <div className="dark:bg-white bg-gray-950 rounded-full p-2 cursor-pointer w-fit" onClick={handleThemeChange}>
          <IoMoon color={themeBoolean ? "#030712" : "white"} size={18} />
        </div>
      </div>

    </div>
  </>)
}
