import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable, type DropResult } from "react-beautiful-dnd"

import "../index.css";
import NoList from "./NoList.tsx";
import Searchbar from "./Searchbar.tsx";
import { Task } from "../utilities/Task.ts";
import ListOfTasks from "./ListOfTasks.tsx";
import type { RootState } from "../store/index.ts";
import type { PrioritySelection, TaskObject } from "../types/index.ts";
import { dataActions } from "../store/data.ts";
import DropDown from "./DropDown.tsx";
import PriorityBar from "./PriorityBar.tsx";
import { itemsActions } from "../store/items.ts";

export default function TaskSidebar() {
  const dispatch = useDispatch();
  const allTasks = useSelector((state: RootState) => state.data);
  const themeBoolean = useSelector((state: RootState) => state.theme);
  const items = useSelector((state: RootState) => state.items);
  const [inputValue, setInputValue] = useState<string>("");
  const [completionSelection, setCompletionSelection] = useState<boolean | null>(null);
  const [prioritySelection, setPrioritySelection] = useState<PrioritySelection>({ low: true, medium: true, high: true });
  const [isDragAllowed, setIsDragAllowed] = useState<boolean>(true);

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    const i = Array.from(allTasks);
    if (result.source.droppableId === "High") {
      const highTask = i.filter(i => i.priority === "High");
      const draggedTaskIndexInList = i.findIndex(i => i.id === highTask[result.source.index].id);
      const onDroppedTaskIndexInList = i.findIndex(i => i.id === highTask[result.destination!.index].id);
      const [recordedI] = i.splice(draggedTaskIndexInList, 1);
      i.splice(onDroppedTaskIndexInList, 0, recordedI);
    }
    else if (result.source.droppableId === "Medium") {
      const mediumTask = i.filter(i => i.priority === "Medium");
      const draggedTaskIndexInList = i.findIndex(i => i.id === mediumTask[result.source.index].id);
      const onDroppedTaskIndexInList = i.findIndex(i => i.id === mediumTask[result.destination!.index].id);
      const [recordedI] = i.splice(draggedTaskIndexInList, 1);
      i.splice(onDroppedTaskIndexInList, 0, recordedI);
    }
    else if (result.source.droppableId === "Low") {
      const lowTask = i.filter(i => i.priority === "Low");
      const draggedTaskIndexInList = i.findIndex(i => i.id === lowTask[result.source.index].id);
      const onDroppedTaskIndexInList = i.findIndex(i => i.id === lowTask[result.destination!.index].id);
      const [recordedI] = i.splice(draggedTaskIndexInList, 1);
      i.splice(onDroppedTaskIndexInList, 0, recordedI);
    }

    dispatch(dataActions.sortTask(i));
    dispatch(itemsActions.getFilteredItems({ allTasks: i, filters: { searchInput: inputValue, completion: completionSelection, low: prioritySelection.low, medium: prioritySelection.medium, high: prioritySelection.high } }));
  }

  function handleOnSearch() {
    dispatch(itemsActions.getFilteredItems({ allTasks, filters: { searchInput: inputValue, completion: completionSelection, low: prioritySelection.low, medium: prioritySelection.medium, high: prioritySelection.high } }));
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.trim() !== "") setIsDragAllowed(false);
    else setIsDragAllowed(true);
    setInputValue(event.target.value);
  }

  function handleCompletionSelection(id: number) {
    let cSelection: boolean | null;
    if (id === 0) {
      cSelection = null;
      setIsDragAllowed(true);
    } 
    else if (id === 1) {
      cSelection = true;
      setIsDragAllowed(false);
    } 
    else if (id === 2) {
      cSelection = false;
      setIsDragAllowed(false);
    } 
    setCompletionSelection(() => {
      dispatch(itemsActions.getFilteredItems({ allTasks, filters: { searchInput: inputValue, completion: cSelection, low: prioritySelection.low, medium: prioritySelection.medium, high: prioritySelection.high } }));
      return cSelection;
    });
  }

  function handleOnPrioritySelection(prioritySelection: PrioritySelection) {
    setPrioritySelection(prioritySelection);
  }

  function handleOnClear() {
    setInputValue(() => {
      dispatch(itemsActions.getFilteredItems({ allTasks, filters: { searchInput: "", completion: completionSelection, low: prioritySelection.low, medium: prioritySelection.medium, high: prioritySelection.high } }));
      return "";
    });
    if (completionSelection === null) setIsDragAllowed(true);
    else setIsDragAllowed(false);
  }

  useEffect(() => {
    dispatch(itemsActions.getFilteredItems({ allTasks, filters: { searchInput: inputValue, completion: completionSelection, low: prioritySelection.low, medium: prioritySelection.medium, high: prioritySelection.high } }));
  }, [allTasks]);

  return (<>
    <div className="bg-white dark:bg-gray-950 w-full h-screen flex flex-col justify-between">

      <div className="flex flex-col items-center justify-center w-full pt-2 gap-2 border-b border-b-gray-800">
        <div className="flex flex-row gap-2 w-full px-2">
          <DropDown onSelect={handleCompletionSelection} />
          <Searchbar onClick={handleOnSearch} onChange={handleInputChange} onClear={handleOnClear} inputValue={inputValue} />
        </div>

        <PriorityBar onClick={handleOnPrioritySelection} />
      </div>

      <div className={`flex flex-col grow mt-2 mx-2 pb-2 items-center gap-2 h-screen overflow-y-auto ${themeBoolean ? "sidebar-scrollable" : "sidebar-scrollable-light"}`}>

        {Task.getTotalNumberOfTasksLS() === 0 && <NoList />}

        {prioritySelection.high && isDragAllowed && <div className="w-full font-Estedad dark:bg-red-950 bg-red-200 px-1 py-1 rounded-md">
          <p className="text-red-500 font-bold w-full text-right px-2 pb-2">اولویت زیاد</p>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="High">
              {(provided) => (
                <ul className="w-full flex flex-col gap-1.5" {...provided.droppableProps} ref={provided.innerRef}>
                  {items.filter(item => item.priority === "High").map((task: TaskObject, index) => (
                    <Draggable key={task.id} index={index} draggableId={String(task.id)}>
                      {(provided) => (
                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                          <ListOfTasks key={task.id} id={task.id} title={task.title} isCompleted={task.isCompleted} description={task.description} priority={task.priority} />
                        </li>
                      )}
                    </Draggable>
                  ))}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>}

        {prioritySelection.medium && isDragAllowed && <div className="w-full font-Estedad dark:bg-yellow-950 bg-yellow-200 px-1 py-1 rounded-md">
          <p className="text-yellow-500 font-bold w-full text-right px-2 pb-2">اولویت متوسط</p>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="Medium">
              {(provided) => (
                <ul className="w-full flex flex-col gap-1.5" {...provided.droppableProps} ref={provided.innerRef}>
                  {items.filter(item => item.priority === "Medium").map((task: TaskObject, index) => (
                    <Draggable key={task.id} index={index} draggableId={String(task.id)}>
                      {(provided) => (
                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                          <ListOfTasks key={task.id} id={task.id} title={task.title} isCompleted={task.isCompleted} description={task.description} priority={task.priority} />
                        </li>
                      )}
                    </Draggable>
                  ))}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>}

        {prioritySelection.low && isDragAllowed && <div className="w-full font-Estedad dark:bg-blue-950 bg-blue-200 px-1 py-1 rounded-md">
          <p className="text-blue-500 font-bold w-full text-right px-2 pb-2">اولویت کم</p>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="Low">
              {(provided) => (
                <ul className="w-full flex flex-col gap-1.5" {...provided.droppableProps} ref={provided.innerRef}>
                  {items.filter(item => item.priority === "Low").map((task: TaskObject, index) => (
                    <Draggable key={task.id} index={index} draggableId={String(task.id)}>
                      {(provided) => (
                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                          <ListOfTasks key={task.id} id={task.id} title={task.title} isCompleted={task.isCompleted} description={task.description} priority={task.priority} />
                        </li>
                      )}
                    </Draggable>
                  ))}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>}


        {prioritySelection.high && !isDragAllowed && <div className="w-full font-Estedad dark:bg-red-950 bg-red-200 px-1 py-1 rounded-md">
          <p className="text-red-500 font-bold w-full text-right px-2 pb-2">اولویت زیاد</p>
          <ul className="w-full flex flex-col gap-1.5">
            {items.filter(item => item.priority === "High").map((task: TaskObject) => (
              <li key={task.id}>
                <ListOfTasks key={task.id} id={task.id} title={task.title} isCompleted={task.isCompleted} description={task.description} priority={task.priority} />
              </li>
            ))}
          </ul>
        </div>}

        {prioritySelection.medium && !isDragAllowed && <div className="w-full font-Estedad dark:bg-yellow-950 bg-yellow-200 px-1 py-1 rounded-md">
          <p className="text-yellow-500 font-bold w-full text-right px-2 pb-2">اولویت متوسط</p>
          <ul className="w-full flex flex-col gap-1.5">
            {items.filter(item => item.priority === "Medium").map((task: TaskObject, index) => (
              <li key={task.id}>
                <ListOfTasks key={task.id} id={task.id} title={task.title} isCompleted={task.isCompleted} description={task.description} priority={task.priority} />
              </li>
            ))}
          </ul>
        </div>}

        {prioritySelection.low && !isDragAllowed && <div className="w-full font-Estedad dark:bg-blue-950 bg-blue-200 px-1 py-1 rounded-md">
          <p className="text-blue-500 font-bold w-full text-right px-2 pb-2">اولویت کم</p>
          <ul className="w-full flex flex-col gap-1.5">
            {items.filter(item => item.priority === "Low").map((task: TaskObject, index) => (
              <li key={task.id}>
                <ListOfTasks key={task.id} id={task.id} title={task.title} isCompleted={task.isCompleted} description={task.description} priority={task.priority} />
              </li>
            ))}
          </ul>
        </div>}

      </div>
    </div>
  </>)
}
