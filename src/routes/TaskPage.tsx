import { Form, Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoPencil, IoTrashBin } from "react-icons/io5";
import { Helmet } from "react-helmet";

import type { TaskObject } from "../types/index.ts";
import type { RootState } from "../store/index.ts";
import { dataActions } from "../store/data.ts";


export default function TaskPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskId } = useParams();
  const allTasks = useSelector((state: RootState) => state.data);
  const { id, title, description, priority, isCompleted } = allTasks.find((t) => t.id === Number(taskId)) as TaskObject;

  function handleSubmit(event: any) {
    event.preventDefault();
    navigate(`/edit-task/${id}`);
  }

  function handleOnChange() {
    const newTask: TaskObject = { id, title, description, priority, isCompleted: !isCompleted }
    dispatch(dataActions.editTask(newTask));
  }

  function handleDelete() {
    dispatch(dataActions.deleteTask(id!));
    navigate("/");
  }

  return (<>
    <Helmet>
      <title>Viewing Task</title>
      <link rel="shortcut icon" href="Favicon.png" />
    </Helmet>

    <Form className="flex flex-col justify-start items-start h-full w-full gap-6 p-4 px-8 dark:bg-gray-950 bg-white" onSubmit={handleSubmit}>

      <div className="flex flex-col justify-start items-start gap-1 mt-16 border-b border-b-gray-800 w-full pb-6">
        <h2 className="text-3xl font-semibold dark:text-white text-gray-950">{title}</h2>
      </div>

      <div className="flex flex-row justify-start items-start pb-6 w-full">
        <p className="dark:text-white text-gray-950 font-semibold text-lg">Description: <span className="font-normal dark:text-gray-200 text-gray-900 ">{description}</span></p>
      </div>

      <div className="flex flex-row justify-start items-center pb-6 w-full gap-5">
        <label className="dark:text-white text-gray-950 font-semibold text-lg">Priority: </label>
        {priority === "Low" && <p className="dark:bg-blue-950 bg-blue-100 text-blue-600 border-blue-400 dark:text-blue-400 dark:border-blue-800 border rounded-md px-2 py-1 font-medium text-center text-sm block whitespace-nowrap">Low</p>}
        {priority === "Medium" && <p className="bg-yellow-100 text-yellow-600 border-yellow-400 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800 border rounded-md px-2 py-1 font-medium text-center text-sm block whitespace-nowrap">Medium</p>}
        {priority === "High" && <p className="bg-red-100 text-red-600 border-red-400 dark:bg-red-950 dark:text-red-400 dark:border-red-800 border rounded-md px-2 py-1 font-medium text-center text-sm block whitespace-nowrap">High</p>}
      </div>

      <div className="flex flex-row justify-start items-center pb-6 w-full gap-5 border-b border-b-gray-800">
        <p className="dark:text-white text-gray-950 font-semibold text-lg">Mark as Complete: </p>
        <label className="relative inline-flex items-center cursor-pointer">
          <input checked={isCompleted} type="checkbox" className="sr-only peer" onChange={handleOnChange} />
          <div className="w-11 h-6 dark:bg-gray-700 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
        </label>
      </div>

      <div className="flex flex-row w-full justify-end items-start gap-2">
        <Link className="dark:text-white text-gray-950 cursor-pointer bg-transparent py-2 px-3 rounded-md hover:underline" to={"/"}>Close</Link>

        <button className="text-white cursor-pointer bg-indigo-500 py-2 px-3 rounded-md hover:bg-indigo-600 flex flex-row items-center justify-between gap-2" type="submit">
          <IoPencil color="white" size={20} />
          <span>Edit</span>
        </button>

        <button className="text-white cursor-pointer bg-red-500 py-2 px-3 rounded-md hover:bg-red-600 flex flex-row items-center justify-between gap-2" onClick={handleDelete}>
          <IoTrashBin color="white" size={20} />
          <span>Delete</span>
        </button>
      </div>
    </Form>
  </>);
}
