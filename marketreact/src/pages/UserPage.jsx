import React from "react"; // Исправлено Reacts -> React
import "./products.css";

const UserPage = ({ products, addToCart }) => {
    return (
        <div className="page">
            <h1 className="title">
                Магазин
            </h1>
            <p className="page-subtitle">
                {products?.length > 0
                    ? `${products.length} ${products.length === 1 ? "товар" : "товаров"}`
                    : "Каталог товаров"}
            </p>

            <div className="grid">
                {products && products.length > 0 ? (
                    products.map((p) => (
                        <div key={p.id} className="card">
                            <div className="image-container">
                                {p.img ? (
                                    <img
                                        src={p.img}
                                        alt={p.name}
                                        className="product-img"
                                    />
                                ) : (
                                    <div className="image-placeholder">🛍</div>
                                )}
                            </div>

                            <div className="card-body">
                                <h2 className="name">{p.name}</h2>
                                {p.descr && <p className="descr">{p.descr}</p>}

                                <div className="bottom">
                                    <span className="price">
                                        {Number(p.price).toLocaleString("ru-KZ")}
                                        <span className="price-currency"> тг</span>
                                    </span>
                                    <button
                                        className="btn"
                                        onClick={() => addToCart && addToCart(p)}
                                    >
                                        В корзину
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">📦</div>
                        <p>Товаров пока нет</p>
                        <p style={{ fontSize: "13px", opacity: 0.5 }}>Добавьте первый товар через Админку</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPage;