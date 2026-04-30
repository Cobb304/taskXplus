import type { Stat } from "../types";

export default function Stats({ title, count, icon }: Stat) {
  return (<>
    <div className="dark:bg-gray-900 bg-gray-200 flex items-center justify-start p-3 rounded-md">
      
      <div className="bg-indigo-500 w-fit p-1.5 rounded-md mr-4 ml-1">
        {icon}
      </div>

      <div className="flex flex-col">
        <p className="dark:text-gray-300 text-gray-700 text-md">{title}</p>
        <h2 className="dark:text-white text-gray-950 font-bold text-3xl">{count}</h2>
      </div>

    </div>
  </>);
}