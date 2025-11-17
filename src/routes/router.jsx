import { createBrowserRouter } from "react-router";
import Root from "../layouts/root/root";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("./serviceCenters.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/forget-password",
        Component: ForgetPassword,
      },
    ],
  },
]);
