import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardMenuLayout from "./components/pages/DashboardMenuLayout";
import AddPages from "./components/pages/AddPages";
import HistoryPages from "./components/pages/HistoryPages";
import AnalysisPages from "./components/pages/AnalysisPages";
import SettingsPages from "./components/pages/SettingsPages";
import NotFoundPages from "./components/pages/NotFoundPages";
import HomePages from "./components/pages/HomePages";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DashboardMenuLayout>
        <HomePages />
      </DashboardMenuLayout>
    ),
  },
  {
    path: "/add",
    element: (
      <DashboardMenuLayout>
        <AddPages />
      </DashboardMenuLayout>
    ),
  },
  {
    path: "/history",
    element: (
      <DashboardMenuLayout>
        <HistoryPages />
      </DashboardMenuLayout>
    ),
  },
  {
    path: "/analysis",
    element: (
      <DashboardMenuLayout>
        <AnalysisPages />
      </DashboardMenuLayout>
    ),
  },
  {
    path: "/settings",
    element: (
      <DashboardMenuLayout>
        <SettingsPages />
      </DashboardMenuLayout>
    ),
  },
  {
    path: "*",
    element: <NotFoundPages />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
