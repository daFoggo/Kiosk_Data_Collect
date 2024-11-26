import { createBrowserRouter, RouteObject } from "react-router";

import RootLayout from "@/layouts/root-layout";
import Home from "@/pages/Home";

const routeLayout: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
];

const router = createBrowserRouter(routeLayout);

export default router;
