import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "./page/Home.tsx";
import V1 from "./page/v1/V1.tsx";
import V2 from "./page/v2/V2.tsx";
import V1Product from "./page/v1/V1Product.tsx";
import V1ProductCreate from "./page/v1/V1ProductCreate.tsx";
import V1ProductUpdate from "./page/v1/V1ProductUpdate.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="v1">
        <Route index element={<V1 />} />
        <Route path="product" element={<V1Product />} />
        <Route path="product-create" element={<V1ProductCreate />} />
        <Route path="product-update/:id" element={<V1ProductUpdate />} />
      </Route>
      <Route path="v2" element={<V2 />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
