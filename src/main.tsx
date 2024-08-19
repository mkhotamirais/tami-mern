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
import ErrorBoundary from "./ErrorBoundary.jsx";
import V2User from "./page/v2/v2-user/V2User.tsx";
import V2Product from "./page/v2/v2-product/V2Product.tsx";
import V2ProductCreate from "./page/v2/v2-product/V2ProductCreate.tsx";
import V2ProductUpdate from "./page/v2/v2-product/V2ProductUpdate.tsx";
import V2Login from "./page/v2/v2-auth/V2Login.tsx";
import V2Register from "./page/v2/v2-auth/V2Register.tsx";
import { V2Protected, V2IsLogin } from "./page/v2/V2Protected.tsx";
import V2UserUpdate from "./page/v2/v2-user/V2UserUpdate.tsx";
import V2Me from "./page/v2/v2-me/V2Me.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
      <Route path="v1">
        <Route index element={<V1 />} />
        <Route path="product" element={<V1Product />} />
        <Route path="product-create" element={<V1ProductCreate />} />
        <Route path="product-update/:id" element={<V1ProductUpdate />} />
      </Route>
      <Route path="v2">
        <Route index element={<V2 />} />
        <Route path="me" element={<V2Me />} />
        <Route element={<V2IsLogin />}>
          <Route path="login" element={<V2Login />} />
          <Route path="register" element={<V2Register />} />
        </Route>
        <Route element={<V2Protected />}>
          <Route path="user" element={<V2User />} />
          <Route path="user-update/:id" element={<V2UserUpdate />} />
          <Route path="product" element={<V2Product />} />
          <Route path="product-create" element={<V2ProductCreate />} />
          <Route path="product-update/:id" element={<V2ProductUpdate />} />
        </Route>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
