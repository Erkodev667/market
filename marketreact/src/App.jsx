import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import EditPage from "./pages/EditPage";
import AddPage from "./pages/AddPage";
import UserPage from "./pages/UserPage";
import Basket from "./pages/Basket";
import "./App.css";
import "./pages/products.css";

export default function App() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("products");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Стейт для всплывающих уведомлений
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const saveProducts = (updated) => {
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  const addProduct = (newProduct) => {
    saveProducts([...products, newProduct]);
  };

  const updateProduct = (updatedItem) => {
    saveProducts(products.map((p) => (p.id === updatedItem.id ? updatedItem : p)));
  };

  const deleteProducts = (id) => {
    saveProducts(products.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Улучшенная функция добавления в корзину с триггером анимации сообщения
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Создаем уникальное уведомление
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, text: `✨ "${product.name}" добавлен в корзину!` }]);

    // Удаляем его через 3 секунды (время анимации)
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      setCart((prev) =>
          prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    }
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
      <BrowserRouter>
        <nav className="nav">
          <Link to="/" className="nav-brand">
            Market<span>.</span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link to="/cart" className="nav-add" style={{ background: "transparent", border: "1px solid var(--border-2)" }}>
              🛒 Корзина {totalCartItems > 0 && `(${totalCartItems})`}
            </Link>
            <Link to="/add" className="nav-add">
              + Добавить
            </Link>
          </div>
        </nav>

        {/* Контейнер для всплывающих уведомлений */}
        <div className="toast-container">
          {notifications.map((n) => (
              <div key={n.id} className="toast-notification">
                {n.text}
              </div>
          ))}
        </div>

        <main>
          <Routes>
            <Route path="/" element={<UserPage products={products} addToCart={addToCart} />} />
            <Route path="/admin" element={<ProductsPage products={products} />} />
            <Route path="/add" element={<AddPage onAdd={addProduct} />} />
            <Route path="/edit/:id" element={<EditPage products={products} onSave={updateProduct} onDelete={deleteProducts} />} />
            <Route path="/cart" element={<Basket cart={cart} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />} />
          </Routes>
        </main>
      </BrowserRouter>
  );
}