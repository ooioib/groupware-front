import "./App.css";

import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
// 각 페이지 컴포넌트 불러오기
import AdminIndexPage from "./pages/admin/AdminIndex";
import AdminAddEmployeePage from "./pages/admin/AdminAddEmployee";
import AdminManageEmployeePage from "./pages/admin/AdminManageEmployee";
import UserIndexPage from "./pages/user/UserIndex";
import UserWorkspacePage from "./pages/user/UserWorkspace";
import UserChangePasswordPage from "./pages/user/UserChangePassword";

import { useState } from "react";
import { UserProvider } from "./provider/UserProvider";

function App() {
  const [user] = useState(null);
  console.log(user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/user/index" />,
    },
    {
      path: "/user/index",
      element: <UserIndexPage />,
    },
    {
      path: "/user/workspace",
      element: <UserWorkspacePage />,
    },
    {
      path: "/user/workspace/setting/password",
      element: <UserChangePasswordPage />,
    },
    {
      path: "/admin/index",
      element: <AdminIndexPage />,
    },
    {
      path: "/admin/employees/add",
      element: <AdminAddEmployeePage />,
    },
    {
      path: "/admin/employees/manage",
      element: <AdminManageEmployeePage />,
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />;
    </UserProvider>
  );
}

export default App;
