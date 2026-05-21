import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import EditPage from "./pages/EditPage";
import AddPage from "./pages/AddPage";
import UserPage from "./pages/UserPage";
import initialProducts from "./modals/products";
import "./App.css";
import "./pages/products.css";

export default function App() {
  const [products, setProducts] = useState(()=> {
    const savedProducts =localStorage.getItem
  });
  

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedItem) => {
    setProducts(
      products.map((p) => (p.id === updatedItem.id ? updatedItem : p)),
    );
  };

  const deleteProducts = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/" style={{ marginRight: "15px" }}>
          Market Menu
        </Link>
        <Link to="/add" style={{ fontSize: "20px" }}>
          ➕
        </Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<UserPage products={products} />} />
          <Route path="/admin" element={<ProductsPage products={products} />} />
          <Route path="/add" element={<AddPage onAdd={addProduct} />} />
          <Route
            path="/edit/:id"
            element={
              <EditPage
                products={products} // Передаем список, чтобы EditPage нашла нужный id
                onSave={updateProduct}
                onDelete={deleteProducts}
              />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
