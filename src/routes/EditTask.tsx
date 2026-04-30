import { Form, Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Helmet } from "react-helmet";

import type { Priority, TaskObject } from "../types/index.ts";
import type { RootState } from "../store/index.ts";
import { dataActions } from "../store/data.ts";


export default function EditTask() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const allTasks = useSelector((state: RootState) => state.data);
  const { id, title, description, priority, isCompleted } = allTasks.find((t) => t.id === Number(taskId)) as TaskObject;

  const [values, setValues] = useState({ title, description, priority });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as Priority;
    const newTask: TaskObject = { id, title, description, priority, isCompleted }
    dispatch(dataActions.editTask(newTask));
    navigate(`/task/${id}`);
  }

  const handleOnChange = (event: any) => {
    const { name, value } = event.target;
    setValues(prevValues => ({ ...prevValues, [name]: value }
    ));
  };

  return (<>
    <Helmet>
      <title>Edit Task</title>
      <link rel="shortcut icon" href="Favicon.png" />
    </Helmet>

    <div className="flex flex-col justify-start items-start h-full w-full gap-6 p-4 px-8 bg-white dark:bg-gray-950">

      <div className="flex flex-col justify-start items-start gap-1 mt-16 border-b border-b-gray-800 w-full pb-6">
        <h2 className="text-lg font-semibold dark:text-white text-gray-950">Edit your already existing Task</h2>
        <p className="text-md font-normal dark:text-gray-300 text-gray-700">This information will be updated after submitting the form.</p>
      </div>

      <Form className="w-full" onSubmit={handleSubmit} onChange={handleOnChange} method="post">

        <div className="flex flex-row justify-start items-center border-b border-b-gray-800 pb-6 w-full gap-60">
          <label htmlFor="title" className="dark:text-white text-gray-950 font-semibold text-lg">Title</label>
          <input className="dark:bg-gray-800 bg-gray-300 h-9 w-70 rounded-md text-gray-950 dark:text-white placeholder:text-gray-700 dark:placeholder:text-gray-400 pl-2.5 pb-0.5" type="text" name="title" id="title" placeholder="Test" value={values.title} />
        </div>

        <div className="flex flex-row justify-start items-start border-b border-b-gray-800 pb-6 w-full gap-45.5 mt-6">
          <label htmlFor="description" className="dark:text-white text-gray-950 font-semibold text-lg">Description</label>

          <div className="w-full flex flex-col justify-between gap-4.5">
            <textarea className="dark:bg-gray-800 bg-gray-300 rounded-md w-full h-50 dark:text-white text-gray-950 px-2.5 pt-1" id="description" name="description" value={values.description} />
            <p className="text-md font-normal dark:text-gray-300 text-gray-700">Write a few sentence about the Task.</p>
          </div>
        </div>

        <div className="flex flex-row justify-start items-start border-b border-b-gray-800 pb-6 w-full gap-60 mt-6">
          <label className="dark:text-white text-gray-950 font-semibold text-lg">Priority</label>

          <div className="flex flex-col gap-4 item-start">

            <div className="flex flex-row items-center gap-3 w-fit">
              <input className="cursor-pointer" type="radio" name="priority" id="low" value="Low" checked={values.priority === "Low" && true} />
              <label className="dark:text-white text-gray-950 font-semibold text-md cursor-pointer" htmlFor="low">Low</label>
            </div>

            <div className="flex flex-row items-center gap-3 w-fit">
              <input className="cursor-pointer" type="radio" name="priority" id="medium" value="Medium" checked={values.priority === "Medium" && true} />
              <label className="dark:text-white text-gray-950 font-semibold text-md cursor-pointer" htmlFor="medium">Medium</label>
            </div>

            <div className="flex flex-row items-center gap-3 w-fit">
              <input className="cursor-pointer" type="radio" name="priority" id="high" value="High" checked={values.priority === "High" && true} />
              <label className="dark:text-white text-gray-950 font-semibold text-md cursor-pointer" htmlFor="high">High</label>
            </div>

          </div>
        </div>

        <div className="flex flex-row justify-end gap-2 mt-6">
          <Link className="dark:text-white text-gray-950 cursor-pointer bg-transparent py-2 px-3 rounded-md hover:underline" to={`/task/${id}`}>Back</Link>
          <button className="text-white cursor-pointer bg-indigo-500 py-2 px-3 rounded-md hover:bg-indigo-600" type="submit">Submit</button>
        </div>

      </Form>

    </div>
  </>);
}
