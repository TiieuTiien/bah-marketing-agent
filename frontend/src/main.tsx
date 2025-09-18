import { StrictMode } from "react";
import {  RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "./styles/design-system.css";
import "./styles/base.css";
import "./index.css";
import { router } from "./routes/Routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>
);
