import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardMenuPages from "./components/pages/DashboardMenuPages";
import NotFoundPages from "./components/pages/NotFoundPages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardMenuPages />,
  },
  {
    path: "/",
    element: <DashboardMenuPages />,
  },
  {
    path: "/",
    element: <DashboardMenuPages />,
  },
  {
    path: "/",
    element: <DashboardMenuPages />,
  },
  {
    path: "*",
    element: <NotFoundPages />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
