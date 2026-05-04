import { Form, Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Helmet } from "react-helmet";

import type { Priority, TaskObject } from "../types/index.ts";
import type { RootState } from "../store/index.ts";
import { dataActions } from "../store/data.ts";
import { GiCancel } from "react-icons/gi";
import { BiCheck } from "react-icons/bi";


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

    {!isCompleted ? (<div className="flex flex-col justify-start items-start h-full w-full gap-6 p-4 px-8 bg-white dark:bg-gray-950 font-Estedad">

      <div className="flex flex-col justify-start items-end gap-1 mt-3 border-b border-b-gray-800 w-full pb-6">
        <h2 className="text-lg font-semibold dark:text-white text-gray-950">ویرایش تسک</h2>
        <p className="text-md font-normal dark:text-gray-300 text-gray-700">.این اطلاعات بعد از ثبت فرم بروزرسانی خواهد شد</p>
      </div>

      <Form className="w-full" onSubmit={handleSubmit} onChange={handleOnChange} method="post">

        <div className="flex flex-row-reverse justify-start items-center border-b border-b-gray-800 pb-6 w-full gap-60">
          <label htmlFor="title" className="dark:text-white text-gray-950 font-semibold text-lg">عنوان</label>
          <input className="dark:bg-gray-800 bg-gray-300 h-9 w-70 rounded-md text-gray-950 dark:text-white placeholder:text-gray-700 dark:placeholder:text-gray-400 px-2.5 pb-0.5" dir="rtl" type="text" name="title" id="title" placeholder="Test" value={values.title} />
        </div>

        <div className="flex flex-row-reverse justify-start items-start border-b border-b-gray-800 pb-6 w-full gap-58 mt-6">
          <label htmlFor="description" className="dark:text-white text-gray-950 font-semibold text-lg">توضیح</label>

          <div className="w-full flex flex-col justify-between items-end gap-4.5">
            <textarea className="dark:bg-gray-800 bg-gray-300 rounded-md w-full h-50 dark:text-white text-gray-950 px-2.5 pt-1" dir="rtl" id="description" name="description" value={values.description} />
            <p className="text-md font-normal dark:text-gray-300 text-gray-700">چند جمله ای راجب تسک بنویسید. (اختیاری)</p>
          </div>
        </div>

        <div className="flex flex-row-reverse justify-start items-start border-b border-b-gray-800 pb-6 w-full gap-60 mt-6">
          <label className="dark:text-white text-gray-950 font-semibold text-lg">اولویت</label>

          <div className="flex flex-col gap-4 item-start">

            <div className="flex flex-row items-center gap-3 w-fit">
              <label className="dark:text-white text-gray-950 font-semibold text-md cursor-pointer" htmlFor="low">کم</label>
              <input className="cursor-pointer" type="radio" name="priority" id="low" value="Low" checked={values.priority === "Low" && true} />
            </div>

            <div className="flex flex-row items-center gap-3 w-fit">
              <label className="dark:text-white text-gray-950 font-semibold text-md cursor-pointer" htmlFor="medium">متوسط</label>
              <input className="cursor-pointer" type="radio" name="priority" id="medium" value="Medium" checked={values.priority === "Medium" && true} />
            </div>

            <div className="flex flex-row items-center gap-3 w-fit">
              <label className="dark:text-white text-gray-950 font-semibold text-md cursor-pointer" htmlFor="high">زیاد</label>
              <input className="cursor-pointer" type="radio" name="priority" id="high" value="High" checked={values.priority === "High" && true} />
            </div>

          </div>
        </div>

        <div className="flex flex-row-reverse justify-end gap-2 mt-6">
          <Link className="text-white cursor-pointer bg-red-500 py-2 px-3 rounded-md hover:underline flex flex-row justify-between items-center gap-2" to={`/task/${id}`}>
            لغو
            <GiCancel color="white" size={20} />
          </Link>

          <button className="text-white cursor-pointer bg-indigo-500 py-2 px-3 rounded-md hover:bg-indigo-600 flex flex-row justify-between items-center gap-2" type="submit">
            ثبت
            <BiCheck color="white" size={24} />
          </button>
        </div>

      </Form>

    </div>) : <div className="text-4xl dark:text-white text-gray-950 w-full h-full flex items-center justify-center gap-2"><span className="font-bold">YES: </span>Editing is not allowed!</div>}
  </>);
}
