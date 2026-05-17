import React from "react";
import "./products.css";

// Добавляем addToCart вместо onEdit для ясности
const UserPage = ({ products, addToCart }) => {
  return (
    <div className="page">
      <h1 className="title">Магазин</h1>

      <div className="grid">
        {products && products.length > 0 ? (
          products.map((p) => (
            <div key={p.id} className="card">
              {/* Добавляем отображение картинки. Если p.img пустое, покажем заглушку */}
              <div className="image-container">
                <img
                  src={p.img || "https://via.placeholder.com/150"}
                  alt={p.name}
                  className="product-img"
                />
              </div>

              <h2 className="name">{p.name}</h2>
              <p className="descr">{p.descr}</p>

              <div className="bottom">
                <span className="price">{p.price} тг</span>
                {/* Теперь кнопка логически делает покупку */}
                <button className="btn" onClick={() => addToCart(p)}>
                  В корзину
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Товаров пока нет...</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
