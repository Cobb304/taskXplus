import NoProject from "../components/NoProject";
import { Helmet } from "react-helmet";

export default function App() {
  return (<>
    <Helmet>
      <title>Task X+</title>
      <link rel="shortcut icon" href="Favicon.png" />
    </Helmet>

    <div className="flex flex-col justify-center items-center h-full dark:bg-gray-950 bg-white">
      <NoProject />
    </div>
  </>)
}
