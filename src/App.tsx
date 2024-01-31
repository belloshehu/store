import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProductTable } from "./components/ProductTable";
import { Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Container from "./components/Container";
function App() {
  return (
    <Container>
      <Routes>
        <Route element={<Product />} path="/" />
        <Route element={<ProductDetail />} path="/product/:id" />
      </Routes>
    </Container>
  );
}

export default App;
