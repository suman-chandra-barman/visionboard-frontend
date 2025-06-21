import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import App from "../App";
import Eyeglasses from "../pages/dashboard/eyeglasses/EyeglassesList";
import AddEyeglasses from "../pages/dashboard/eyeglasses/AddEyeglasses";
import Sales from "../pages/dashboard/sales/Sales";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/dashboard/dashboard/Dashboard";
import Users from "../pages/dashboard/users/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "dashboard/add-eyeglasses",
        element: <AddEyeglasses />,
      },
      {
        path: "dashboard/eyeglassesList",
        element: <Eyeglasses />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
