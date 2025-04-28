import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import AdminIndexPage from "./pages/admin/AdminIndex";
import AdminAddEmployeePage from "./pages/admin/AdminAddEmployee";

function App() {
  const router = createBrowserRouter([
    {
      path: "/admin/index",
      element: <AdminIndexPage />,
    },
    {
      path: "/admin/employees/add",
      element: <AdminAddEmployeePage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
