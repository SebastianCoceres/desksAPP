import ReactDOM from "react-dom/client";
import App from "./pages/App";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "@/components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Desk from "pages/Desk";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/desks/:deskId",
    element: <Desk />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <CssBaseline />
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </>
);
