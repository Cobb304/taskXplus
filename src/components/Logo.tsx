import { Link } from "react-router-dom";

export default function Logo() {
  return (<>
    <Link to={"/"} className="text-4xl font-medium dark:text-white text-gray-950 shrink-0">
      task <span className="text-5xl text-cyan-400 font-extrabold">X+</span>
    </Link>
  </>);
}