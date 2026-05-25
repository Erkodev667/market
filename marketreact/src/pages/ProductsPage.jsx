import React from "react";
import { useNavigate } from "react-router-dom";
import "./products.css";

const ProductsPage = ({ products }) => {
    const navigate = useNavigate();

    return (
        <div className="page">
            <h1 className="title">Админка</h1>
            <p className="page-subtitle">
                Управление товарами · {products.length} позиций
            </p>

            <div className="grid">
                {products.length > 0 ? (
                    products.map((p) => (
                        <div key={p.id} className="card card-admin">
                            <div className="card-body">
                                <span className="admin-badge">● Активен</span>
                                <h2 className="name">{p.name}</h2>
                                {p.descr && <p className="descr">{p.descr}</p>}

                                <div className="bottom">
                  <span className="price">
                    {Number(p.price).toLocaleString("ru-KZ")}
                      <span className="price-currency"> тг</span>
                  </span>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => navigate(`/edit/${p.id}`)}
                                    >
                                        Изменить
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">🗂</div>
                        <p>Товаров пока нет</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ProductsPage