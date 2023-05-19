// ----------------------- React -----------------------
import ReactDOM from "react-dom/client";
// ----------------------- Libraries -----------------------
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
// ----------------------- Styles -----------------------
import "./index.css";
// ----------------------- Routes -----------------------
import { routesMap } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Navigate to={"/admin"} />,
      },  
    ],
  },
  routesMap
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
