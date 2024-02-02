import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import FileNotFound from "./pages/FileNotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Home</div>,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/send",
      element: <SendMoney />,
    },
    {
      path: "*",
      element: <FileNotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
