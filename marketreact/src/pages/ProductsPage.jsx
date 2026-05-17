import React from "react";
import { useNavigate } from "react-router-dom";
import "./products.css";

const ProductsPage = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1 className="title">Админка</h1>
      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <h2 className="name">{p.name}</h2>
            <p className="descr">{p.descr}</p>
            <div className="bottom">
              <span className="price">{p.price} тг</span>
              <button className="btn" onClick={() => navigate(`/edit/${p.id}`)}>
                Изменить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
