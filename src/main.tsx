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
import V3 from "./page/v3/V3.tsx";
import { V3IsLogin, V3Protected } from "./page/v3/V3Protected.tsx";
import V3Login from "./page/v3/v3-auth/V3Login.tsx";
import V3Register from "./page/v3/v3-auth/V3Register.tsx";
import V3Me from "./page/v3/v3-me/V3Me.tsx";
import V3Product from "./page/v3/v3-product/V3Product.tsx";
import V3ProductCreate from "./page/v3/v3-product/V3ProductCreate.tsx";
import V3ProductUpdate from "./page/v3/v3-product/V3ProductUpdate.tsx";
import V3UserUpdate from "./page/v3/v3-user/V3UserUpdate.tsx";
import V3User from "./page/v3/v3-user/V3User.tsx";
import V3Category from "./page/v3/v3-category/V3Category.tsx";
import V3CategoryCreate from "./page/v3/v3-category/V3CategoryCreate.tsx";
import V3CategoryUpdate from "./page/v3/v3-category/V3CategoryUpdate.tsx";
import V3Tag from "./page/v3/v3-tag/V3Tag.tsx";
import V3TagCreate from "./page/v3/v3-tag/V3TagCreate.tsx";
import V3TagUpdate from "./page/v3/v3-tag/V3TagUpdate.tsx";
import V3Kamus from "./page/v3/v3-kamus/V3Kamus.tsx";
import V3KamusCreate from "./page/v3/v3-kamus/V3KamusCreate.tsx";
import V3KamusUpdate from "./page/v3/v3-kamus/V3KamusUpdate.tsx";
import V0 from "./page/v0/V0.tsx";
import Todo1 from "./page/v0/todo/todo1/Todo1.tsx";
import Todo2 from "./page/v0/todo/todo2/Todo2.tsx";
import Todo3 from "./page/v0/todo/todo3/Todo3.tsx";
import Todo4 from "./page/v0/todo/todo4/Todo4.tsx";
import V4 from "./page/v4/V4.tsx";
import V4Product from "./page/v4/V4Product.tsx";
import V4ProductCreate from "./page/v4/V4ProductCreate.tsx";
import V4ProductUpdate from "./page/v4/V4ProductUpdate.tsx";
import V5 from "./page/v5/V5.tsx";
import V5Product from "./page/v5/V5Product.tsx";
import V5ProductUpdate from "./page/v5/V5ProductUpdate.tsx";
import V5ProductCreate from "./page/v5/V5ProductCreate.tsx";
import V11 from "./page/v1-1/V11.tsx";
import V11Product from "./page/v1-1/V11Product.tsx";
import V11ProductCreate from "./page/v1-1/V11ProductCreate.tsx";
import V11ProductUpdate from "./page/v1-1/V11ProductUpdate.tsx";
import V12 from "./page/v1-2/V12.tsx";
import V12Product from "./page/v1-2/V12Product.tsx";
import V12ProductCreate from "./page/v1-2/V12ProductCreate.tsx";
import V12ProductUpdate from "./page/v1-2/V12ProductUpdate.tsx";
import V1Mysql from "./page/v1Mysql/V1Mysql.tsx";
import V1MysqlProduct from "./page/v1Mysql/V1MysqlProduct.tsx";
import V1MysqlProductCreate from "./page/v1Mysql/V1MysqlProductCreate.tsx";
import V1MysqlProductUpdate from "./page/v1Mysql/V1MysqlProductUpdate.tsx";
import Doc from "./page/doc/Doc.tsx";
import DocMysql from "./page/doc/DocMysql.tsx";
import DocMongodb from "./page/doc/DocMongodb.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
      <Route path="doc">
        <Route index element={<Doc />} />
        <Route path="mysql" element={<DocMysql />} />
        <Route path="mongodb" element={<DocMongodb />} />
      </Route>
      <Route path="v0-todo">
        <Route index element={<V0 />} />
        <Route path="todo1" element={<Todo1 />} />
        <Route path="todo2" element={<Todo2 />} />
        <Route path="todo3" element={<Todo3 />} />
        <Route path="todo4" element={<Todo4 />} />
      </Route>
      <Route path="v1-mongodb">
        <Route index element={<V1 />} />
        <Route path="product" element={<V1Product />} />
        <Route path="product-create" element={<V1ProductCreate />} />
        <Route path="product-update/:id" element={<V1ProductUpdate />} />
      </Route>
      <Route path="v1-1-mongodb">
        <Route index element={<V11 />} />
        <Route path="product" element={<V11Product />} />
        <Route path="product-create" element={<V11ProductCreate />} />
        <Route path="product-update/:id" element={<V11ProductUpdate />} />
      </Route>
      <Route path="v1-2-mongodb">
        <Route index element={<V12 />} />
        <Route path="product" element={<V12Product />} />
        <Route path="product-create" element={<V12ProductCreate />} />
        <Route path="product-update/:id" element={<V12ProductUpdate />} />
      </Route>
      <Route path="v2-mongodb">
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
      <Route path="v3-mongodb">
        <Route index element={<V3 />} />
        <Route path="me" element={<V3Me />} />
        <Route element={<V3IsLogin />}>
          <Route path="login" element={<V3Login />} />
          <Route path="register" element={<V3Register />} />
        </Route>
        <Route path="product" element={<V3Product />} />
        <Route path="category" element={<V3Category />} />
        <Route path="tag" element={<V3Tag />} />
        <Route path="kamus" element={<V3Kamus />} />
        <Route element={<V3Protected />}>
          <Route path="user" element={<V3User />} />
          <Route path="user-update/:id" element={<V3UserUpdate />} />
          <Route path="product-create" element={<V3ProductCreate />} />
          <Route path="product-update/:id" element={<V3ProductUpdate />} />
          <Route path="category-create" element={<V3CategoryCreate />} />
          <Route path="category-update/:id" element={<V3CategoryUpdate />} />
          <Route path="tag-create" element={<V3TagCreate />} />
          <Route path="tag-update/:id" element={<V3TagUpdate />} />
          <Route path="kamus-create" element={<V3KamusCreate />} />
          <Route path="kamus-update/:id" element={<V3KamusUpdate />} />
        </Route>
      </Route>
      <Route path="v4-mongodb">
        <Route index element={<V4 />} />
        <Route path="product" element={<V4Product />} />
        <Route path="product-create" element={<V4ProductCreate />} />
        <Route path="product-update/:id" element={<V4ProductUpdate />} />
      </Route>
      <Route path="v5-mongodb">
        <Route index element={<V5 />} />
        <Route path="product" element={<V5Product />} />
        <Route path="product-create" element={<V5ProductCreate />} />
        <Route path="product-update/:id" element={<V5ProductUpdate />} />
      </Route>
      <Route path="v1-mysql">
        <Route index element={<V1Mysql />} />
        <Route path="product" element={<V1MysqlProduct />} />
        <Route path="product-create" element={<V1MysqlProductCreate />} />
        <Route path="product-update/:id" element={<V1MysqlProductUpdate />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
