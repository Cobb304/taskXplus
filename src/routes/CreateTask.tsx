import { Form, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { GiCancel } from "react-icons/gi";
import { TbTrash } from "react-icons/tb";
import { BiCheck } from "react-icons/bi";
import { useForm, type FieldValues } from "react-hook-form";

import { dataActions } from "../store/data.ts";
import type { Priority } from "../types/index.ts";

export default function CreateTask() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  function onSubmit(data: { title: string, description: string, priority: Priority }) {
    dispatch(dataActions.addTask({ ...data }));
    navigate("/");
  }

  function handleOnClear() {
    reset();
  }


  return (<>
    <Helmet>
      <title>Create Task</title>
      <link rel="shortcut icon" href="Favicon.png" />
    </Helmet>

    <div className="flex flex-col justify-start items-start h-full w-full gap-6 p-4 px-8 dark:bg-gray-950 bg-white font-Estedad">

      <div className="flex flex-col justify-start items-end gap-1 mt-3 border-b border-b-gray-800 w-full pb-6 font-Estedad">
        <h2 className="text-lg font-semibold dark:text-white text-gray-950">ساختن تسک</h2>
        <p className="text-md font-normal dark:text-gray-300 text-gray-700">.این اطلاعات در لیست نمایش داد خواهد شد</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full" method="post">

        <div className="flex flex-row-reverse justify-start items-center border-b border-b-gray-800 pb-6 w-full gap-60" >
          <label htmlFor="title" className="dark:text-white text-gray-950 font-semibold text-lg">عنوان</label>
          <div className="flex flex-row-reverse items-center gap-4">
            <input className="dark:bg-gray-800 bg-gray-300 h-9 w-70 rounded-md dark:text-white text-gray-950 px-2.5 py-0.5 placeholder:text-gray-700 dark:placeholder:text-gray-400" type="text" id="title" placeholder="تست" dir="rtl" {...register("title", {
              required: "عنوان نمی تواند خالی باشد"
            })} />
            {errors.title && <p className="bg-red-100 text-red-600 border-red-400 dark:bg-red-950 dark:text-red-400 dark:border-red-800 border rounded-md px-2 py-1">{errors.title.message}</p>}
          </div>
        </div>

        <div className="flex flex-row-reverse justify-start items-start border-b border-b-gray-800 pb-6 w-full gap-58 mt-6">
          <label htmlFor="description" className="dark:text-white text-gray-950 font-semibold text-lg">توضیح</label>

          <div className="w-full flex flex-col justify-between items-end gap-4.5">
            <textarea className="dark:bg-gray-800 bg-gray-300 dark:text-white text-gray-950 rounded-md w-full h-50 px-2.5 pt-1" dir="rtl" id="description" {...register("description")} />
            <p className="text-md font-normal dark:text-gray-300 text-gray-700">چند جمله راجب تسک بنویسید. (اختیاری)</p>
          </div>
        </div>

        <div className="flex flex-row-reverse justify-start items-start border-b border-b-gray-800 pb-6 w-full gap-60 mt-6">
          <label className="dark:text-white text-gray-950 font-semibold text-lg">اولویت</label>

          <div className="flex flex-col gap-4 item-start">
            <div className="flex flex-row items-center gap-3 w-fit">
              <label className="dark:text-white text-gray-950 font-semibold text-md cursor-pointer" htmlFor="low">کم </label>
              <input className="cursor-pointer" type="radio" id="low" value="Low" {...register("priority", {
                required: "اولویت باید انتخاب شود"
              })} />
            </div>

            <div className="flex flex-row items-center gap-3 w-fit">
              <label className="dark:text-white text-gray-950 font-semibold text-md cursor-pointer" htmlFor="medium">متوسط</label>
              <input className="cursor-pointer" type="radio" id="medium" value="Medium" {...register("priority", {
                required: "اولویت باید انتخاب شود"
              })} />
            </div>

            <div className="flex flex-row items-center gap-3 w-fit">
              <label className="dark:text-white text-gray-950 font-semibold text-md cursor-pointer" htmlFor="high">زیاد</label>
              <input className="cursor-pointer" type="radio" id="high" value="High" {...register("priority", {
                required: "اولویت باید انتخاب شود"
              })} />
            </div>
          </div>
          {errors.priority && <p className="bg-red-100 text-red-600 border-red-400 dark:bg-red-950 dark:text-red-400 dark:border-red-800 border rounded-md px-2 py-1 font-md">{errors.priority.message}</p>}
        </div>

        <div className="flex flex-row-reverse justify-end gap-2 mt-6">
          <Link className="text-white cursor-pointer bg-red-500 py-2 px-3 rounded-md flex flex-row justify-between items-center gap-2" to={"/"}>
            لغو
            <GiCancel color="white" size={20} />
          </Link>

          <button onClick={handleOnClear} type="button" className="text-white cursor-pointer bg-indigo-500 py-2 px-3 rounded-md hover:bg-indigo-600 flex flex-row justify-between items-center gap-2">
            پاک کردن
            <TbTrash color="white" size={20} />
          </button>

          <button className="text-white cursor-pointer bg-indigo-500 py-2 px-3 rounded-md hover:bg-indigo-600 flex flex-row justify-between items-center gap-2" type="submit">
            ثبت
            <BiCheck color="white" size={24} />
          </button>
        </div>

      </form>

    </div>
  </>);
}
