import Home from "@/pages/home";
import Main from "@/pages/main";
import Mall from "@/pages/mall";
import PageOne from "@/pages/other/pageOne";
import PageTwo from "@/pages/other/pageTwo";
import User from "@/pages/user";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    children: [
      //redirect
      {
        path: "/",
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "mall",
        Component: Mall,
      },
      {
        path: "user",
        Component: User,
      },
      {
        path: "other",
        children: [
          {
            path: "pageOne",
            Component: PageOne,
          },
          {
            path: "pageTwo",
            Component: PageTwo,
          },
        ],
      },
    ],
  },
]);

export default router;
