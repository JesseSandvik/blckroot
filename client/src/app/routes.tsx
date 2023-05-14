import { ReactNode } from "react";

import Dashboard from "../pages/dashboard/Dashboard";
import HomePage from "../pages/home/Home";
import LoginPage from "../pages/login/Login";
import SignUpPage from "../pages/signup/SignUp";

type Route = {
  name: string;
  path: string;
  element: ReactNode;
};

export const routes: Array<Route> = [
  {
    name: "home",
    path: "/",
    element: <HomePage />,
  },
  {
    name: "dashboard",
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    name: "login",
    path: "/login",
    element: <LoginPage />,
  },
  {
    name: "signup",
    path: "/signup",
    element: <SignUpPage />,
  },
];
