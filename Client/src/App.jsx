import React from "react";
import { Route, Routes } from "react-router";
import Root from "./components/layout/Root";
import Home from "./components/pages/Home";
import CreateProduct from "./components/pages/CreateProduct";
import UpdateProduct from "./components/pages/UpdateProduct";
import SingleProduct from "./components/pages/SingleProduct";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />}/>
          <Route path="/create" element={<CreateProduct />}/>
          <Route path="/update/:id" element={<UpdateProduct />}/>
          <Route path="/details/:id" element={<SingleProduct />}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
