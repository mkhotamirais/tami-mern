import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "./page/Home.tsx";
import V1TextCreate from "./page/v1/V1TextCreate.tsx";
import V1Text from "./page/v1/V1Text.tsx";
import V1TextUpdate from "./page/v1/V1TextUpdate.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="v1-text">
        <Route index element={<V1Text />} />
        <Route path="create" element={<V1TextCreate />} />
        <Route path="update/:id" element={<V1TextUpdate />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
