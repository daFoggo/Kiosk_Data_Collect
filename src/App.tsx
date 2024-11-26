import { RouterProvider } from "react-router";
import { ThemeProvider } from "./components/ThemeProvider";
import router from "./router/router";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
