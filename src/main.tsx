import "./index.css";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./components/ThemeProvider/index.tsx";
import { RouterProvider } from "react-router";
import router from "./router/router.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
  </ThemeProvider>
);
