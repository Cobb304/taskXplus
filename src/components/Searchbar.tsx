export default function Searchbar({ onChange, inputValue }: any) {
  return (<>
    <div className="flex flex-row justify-between items-center py-1 px-2 w-full gap-2">
      <input onChange={(event) => onChange(event)} type="text" name="search" value={inputValue} placeholder="Search" className="dark:bg-gray-900 bg-gray-200 dark:text-white text-black dark:placeholder:text-gray-300 placeholder:text-gray-600 h-12 w-full rounded-full pl-6 pb-1 focus:border-red-500" />
    </div>
  </>);
}
