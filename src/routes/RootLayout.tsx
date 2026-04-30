import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import MainSidebar from "../components/MainSidebar.tsx";
import TaskSidebar from "../components/TaskSidebar.tsx";
import type { RootState } from "../store/index.ts";


export default function RootLayout() {
  const themeBoolean = useSelector((state: RootState) => state.theme);
  let theme: string;
  if (themeBoolean) {
    theme = "dark";
  } else {
    theme = "";
  }

  return (
    <div className={`${theme} flex flex-row h-screen dark:bg-gray-950 bg-white`}>
      
      <aside className="w-[20%] mr-4 border-r border-r-gray-800">
        <MainSidebar />
      </aside>

      <aside className="w-[25%] mr-4 border-x border-x-gray-800">
        <TaskSidebar />
      </aside>

      <main className="flex-1 bg-gray-950 border-l border-l-gray-800">
        <Outlet />
      </main>

    </div>
  );
}