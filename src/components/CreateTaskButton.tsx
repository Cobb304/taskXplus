import { Link } from "react-router-dom";

export default function CreateTaskButton() {
  return (<>
    <Link to={"/create-task"} className="bg-cyan-400 dark:text-gray-950 text-white shrink-0 text-lg font-semibold cursor-pointer rounded-full py-2 px-3 hover:bg-cyan-500">Create Task</Link>
  </>);
}