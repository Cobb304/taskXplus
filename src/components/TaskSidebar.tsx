import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable, type DropResult } from "react-beautiful-dnd"

import "../index.css";
import NoList from "./NoList.tsx";
import Searchbar from "./Searchbar.tsx";
import { Task } from "../utilities/Task.ts";
import ListOfTasks from "./ListOfTasks.tsx";
import type { RootState } from "../store/index.ts";
import type { TaskObject } from "../types/index.ts";
import { dataActions } from "../store/data.ts";

export default function TaskSidebar() {
  const dispatch = useDispatch();
  const allTasks = useSelector((state: RootState) => state.data);
  const themeBoolean = useSelector((state: RootState) => state.theme);
  const [items, setItems] = useState(allTasks);
  const [inputValue, setInputValue] = useState("");
  const [isDndAllowed, setIsDndAlows] = useState(true);

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    const i = Array.from(allTasks);
    const [recordedI] = i.splice(result.source.index, 1);
    i.splice(result.destination.index, 0, recordedI);

    dispatch(dataActions.sortTask(i));
    setItems(i);
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = (event.target.value);

    setInputValue(() => {
      if (input.trim() !== "") setIsDndAlows(false);
      else setIsDndAlows(true);

      const filteredItems = allTasks.filter(item => item.title.toLowerCase().includes(input.toLowerCase().trim()));
      setItems(filteredItems);

      return input;
    })
  }

  useEffect(() => {
    setItems(allTasks.filter(item => item.title.toLowerCase().includes(inputValue.toLowerCase().trim())));
  }, [allTasks]);

  return (<>
    <div className="bg-white dark:bg-gray-950 w-full h-screen flex flex-col justify-between">

      <div className="flex flex-row items-center justify-center w-full py-2 px-1 border-b border-b-gray-800">
        <Searchbar onChange={handleOnChange} inputValue={inputValue} />
      </div>

      <div className={`flex flex-col grow mt-2 mx-2 items-center gap-2 h-screen overflow-y-auto ${themeBoolean ? "sidebar-scrollable" : "sidebar-scrollable-light"}`}>

        {Task.getTotalNumberOfTasksLS() === 0 && <NoList />}

        {isDndAllowed ? <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="task">
            {(provided) => (
              <ul className="w-full flex flex-col gap-1.5" {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((task: TaskObject, index) => (
                  <Draggable key={task.id} index={index} draggableId={String(task.id)}>
                    {(provided) => (
                      <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <ListOfTasks key={task.id} id={task.id} title={task.title} isCompleted={task.isCompleted} priority={task.priority} />
                      </li>
                    )}
                  </Draggable>
                ))}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
          :
          <ul className="w-full flex flex-col gap-1.5">
            {items.map(task => <li key={task.id}>
              <ListOfTasks key={task.id} id={task.id} title={task.title} isCompleted={task.isCompleted} priority={task.priority} />
            </li>)}
          </ul>
        }
      </div>
    </div>
  </>)
}
