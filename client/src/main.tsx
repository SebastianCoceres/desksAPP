import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "@/components/Layout";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import App from "pages/App";
import Desk from "pages/Desk";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route path="/" element={<App />} />
          <Route path="/desks/:deskId" element={<Desk />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
