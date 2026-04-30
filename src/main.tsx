import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./routes/App.tsx";
import RootLayout from "./routes/RootLayout.tsx";
import store from "./store/index.ts";
import CreateTask from "./routes/CreateTask.tsx";
import TaskPage from "./routes/TaskPage.tsx";
import EditTask from "./routes/EditTask.tsx";
import NotFound from "./components/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/", element: <RootLayout />, children: [
      { path: "/", element: <App /> },
      { path: "/create-task", element: <CreateTask /> },
      { path: "/task/:taskId", element: <TaskPage /> },
      { path: "/edit-task/:taskId", element: <EditTask /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
