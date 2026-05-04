import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable, type DropResult } from "react-beautiful-dnd"
import { BiSearch } from "react-icons/bi";
import { FiFileMinus } from "react-icons/fi";

import "../index.css";
import NoList from "./NoList.tsx";
import Searchbar from "./Searchbar.tsx";
import { Task } from "../utilities/Task.ts";
import ListOfTasks from "./ListOfTasks.tsx";
import type { RootState } from "../store/index.ts";
import type { PrioritySelection, TaskObject } from "../types/index.ts";
import { dataActions } from "../store/data.ts";
import DropDown, { type DropDownItems } from "./DropDown.tsx";
import { itemsActions } from "../store/items.ts";
import DropDownP, { type priorityItem } from "./DropDownP.tsx";

const dropDownItems: DropDownItems[] = [
  { id: 0, label: "بدون فیلتر", checked: true },
  { id: 1, label: "کامل شده", checked: false },
  { id: 2, label: "در حال انجام", checked: false }
]

const pList: priorityItem[] = [
  { id: 0, label: "زیاد", checked: true, checkedStyle: "dark:bg-white dark:text-red-500 bg-gray-950 text-red-500", unCheckedStyle: "dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-500 dark:bg-gray-900 bg-gray-300 hover:bg-gray-400" },
  { id: 1, label: "متوسط", checked: true, checkedStyle: "dark:bg-white dark:text-yellow-500 bg-gray-950 text-yellow-500", unCheckedStyle: "dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-500 dark:bg-gray-900 bg-gray-300 hover:bg-gray-400" },
  { id: 2, label: "کم", checked: true, checkedStyle: "dark:bg-white dark:text-blue-500 bg-gray-950 text-blue-500", unCheckedStyle: "dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-500 dark:bg-gray-900 bg-gray-300 hover:bg-gray-400" }
]

export default function TaskSidebar() {
  const dispatch = useDispatch();
  const allTasks = useSelector((state: RootState) => state.data);
  const themeBoolean = useSelector((state: RootState) => state.theme);
  const items = useSelector((state: RootState) => state.items);
  const [inputValue, setInputValue] = useState<string>("");
  const [completionSelection, setCompletionSelection] = useState<boolean | null>(null);
  const [prioritySelection, setPrioritySelection] = useState<PrioritySelection>({ low: true, medium: true, high: true });
  const [prioritySelectionAfter, setPrioritySelectionAfter] = useState<PrioritySelection>({ low: true, medium: true, high: true });
  const [isDragAllowed, setIsDragAllowed] = useState<boolean>(true);

  const [ddItems, setDdItems] = useState<DropDownItems[]>(dropDownItems);
  const [pItems, setpItems] = useState<priorityItem[]>(pList);

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
    if (inputValue.trim() === "" && completionSelection === null) setIsDragAllowed(true);
    else setIsDragAllowed(false);
    setPrioritySelectionAfter({ low: prioritySelection.low, medium: prioritySelection.medium, high: prioritySelection.high });
    dispatch(itemsActions.getFilteredItems({ allTasks, filters: { searchInput: inputValue, completion: completionSelection, low: prioritySelection.low, medium: prioritySelection.medium, high: prioritySelection.high } }));
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleCompletionSelection(id: number) {
    let cSelection: boolean | null;
    if (id === 0) {
      cSelection = null;
    }
    else if (id === 1) {
      cSelection = true;
    }
    else if (id === 2) {
      cSelection = false;
    }
    setCompletionSelection(() => {
      return cSelection;
    });
  }

  function handleOnPrioritySelection(priorityItems: priorityItem[]) {
    let prioritySel: PrioritySelection = {
      low: priorityItems[2].checked,
      medium: priorityItems[1].checked,
      high: priorityItems[0].checked
    }
    setPrioritySelection(prioritySel);
  }

  function handleOnClear() {
    setInputValue(() => {
      return "";
    });
  }

  function handleClearAllSelection() {
    setInputValue("");
    setCompletionSelection(null);
    setPrioritySelection({ low: true, medium: true, high: true });
    setPrioritySelectionAfter({ low: true, medium: true, high: true });

    setDdItems(() => {
      return [
        { id: 0, label: "بدون فیلتر", checked: true },
        { id: 1, label: "کامل شده", checked: false },
        { id: 2, label: "در حال انجام", checked: false }
      ]
    });
    setpItems(() => {
      return [
        { id: 0, label: "زیاد", checked: true, checkedStyle: "dark:bg-white dark:text-red-500 bg-gray-950 text-red-500", unCheckedStyle: "dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-500 dark:bg-gray-900 bg-gray-300 hover:bg-gray-400" },
        { id: 1, label: "متوسط", checked: true, checkedStyle: "dark:bg-white dark:text-yellow-500 bg-gray-950 text-yellow-500", unCheckedStyle: "dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-500 dark:bg-gray-900 bg-gray-300 hover:bg-gray-400" },
        { id: 2, label: "کم", checked: true, checkedStyle: "dark:bg-white dark:text-blue-500 bg-gray-950 text-blue-500", unCheckedStyle: "dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-gray-500 dark:bg-gray-900 bg-gray-300 hover:bg-gray-400" }
      ]
    });

    dispatch(itemsActions.getFilteredItems({ allTasks, filters: { searchInput: "", completion: null, low: true, medium: true, high: true } }));
    setIsDragAllowed(true);
  }

  useEffect(() => {
    dispatch(itemsActions.getFilteredItems({ allTasks, filters: { searchInput: inputValue, completion: completionSelection, low: prioritySelection.low, medium: prioritySelection.medium, high: prioritySelection.high } }));
  }, [allTasks]);

  return (<>
    <div className="bg-white dark:bg-gray-950 w-full h-screen flex flex-col justify-between">

      <div dir="rtl" className="grid grid-cols-3 grid-rows-2 w-full gap-2 py-2 px-2">
        <Searchbar onClick={handleOnSearch} onChange={handleInputChange} onClear={handleOnClear} inputValue={inputValue} />

        <DropDown onSelect={handleCompletionSelection} dd={ddItems} setDd={setDdItems} />

        <DropDownP onSelect={handleOnPrioritySelection} data={pItems} setData={setpItems} />
      </div>

      <div className="flex flex-row w-full border-b border-b-gray-800 gap-2 px-2 pb-2">
        <button onClick={handleOnSearch} className="bg-indigo-500 font-Estedad py-2 text-white w-[25%] rounded-md flex flex-row items-center justify-center gap-2 hover:bg-indigo-600 cursor-pointer">
          جستجو
          <BiSearch size={26} color="white" />
        </button>

        <button onClick={handleClearAllSelection} className="dark:bg-gray-600 bg-gray-400 font-Estedad py-2 text-white w-[25%] rounded-md flex flex-row items-center justify-center gap-2 dark:hover:bg-gray-500 hover:bg-gray-500 cursor-pointer">
          بازنشانی
          <FiFileMinus size={26} color="white" />
        </button>
      </div>

      <div className={`flex flex-col grow mt-2 mx-2 pb-2 items-center gap-2 h-screen overflow-y-auto ${themeBoolean ? "sidebar-scrollable" : "sidebar-scrollable-light"}`}>

        {Task.getTotalNumberOfTasksLS() === 0 && <NoList />}

        {prioritySelectionAfter.high && isDragAllowed && <div className="w-full font-Estedad dark:bg-red-950 bg-red-200 px-1 py-1 rounded-md">
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

        {prioritySelectionAfter.medium && isDragAllowed && <div className="w-full font-Estedad dark:bg-yellow-950 bg-yellow-200 px-1 py-1 rounded-md">
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

        {prioritySelectionAfter.low && isDragAllowed && <div className="w-full font-Estedad dark:bg-blue-950 bg-blue-200 px-1 py-1 rounded-md">
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


        {prioritySelectionAfter.high && !isDragAllowed && <div className="w-full font-Estedad dark:bg-red-950 bg-red-200 px-1 py-1 rounded-md">
          <p className="text-red-500 font-bold w-full text-right px-2 pb-2">اولویت زیاد</p>
          <ul className="w-full flex flex-col gap-1.5">
            {items.filter(item => item.priority === "High").map((task: TaskObject) => (
              <li key={task.id}>
                <ListOfTasks key={task.id} id={task.id} title={task.title} isCompleted={task.isCompleted} description={task.description} priority={task.priority} />
              </li>
            ))}
          </ul>
        </div>}

        {prioritySelectionAfter.medium && !isDragAllowed && <div className="w-full font-Estedad dark:bg-yellow-950 bg-yellow-200 px-1 py-1 rounded-md">
          <p className="text-yellow-500 font-bold w-full text-right px-2 pb-2">اولویت متوسط</p>
          <ul className="w-full flex flex-col gap-1.5">
            {items.filter(item => item.priority === "Medium").map((task: TaskObject, index) => (
              <li key={task.id}>
                <ListOfTasks key={task.id} id={task.id} title={task.title} isCompleted={task.isCompleted} description={task.description} priority={task.priority} />
              </li>
            ))}
          </ul>
        </div>}

        {prioritySelectionAfter.low && !isDragAllowed && <div className="w-full font-Estedad dark:bg-blue-950 bg-blue-200 px-1 py-1 rounded-md">
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
