import React from "react";
import {useNavigate} from "react-router-dom";
import "../pages/products.css";

const Basket = ({cart, onRemove, onUpdateQuantity}) => {
    const navigate = useNavigate()

    const totalPrice = cart.reduce((sum, item)=> sum+item.price*item.quantity,0)

    return (
        <div className="page">
            <h1 className="title">
                Ваша <span className="title-accent">Корзина</span>
            </h1>
            <p className="page-subtitle">
                {cart.length > 0
                    ? `У вас в корзине ${cart.reduce((sum, item) => sum + item.quantity, 0)} товаров`
                    : "Корзина пуста"}
            </p>

            {cart.length > 0 ? (
                <>
                    <div className="grid">
                        {cart.map((item) => (
                            <div key={item.id} className="card">
                                <div className="image-container">
                                    {item.img ? (
                                        <img src={item.img} alt={item.name} className="product-img" />
                                    ) : (
                                        <div className="image-placeholder">🛍</div>
                                    )}
                                </div>

                                <div className="card-body">
                                    <h2 className="name">{item.name}</h2>
                                    {item.descr && <p className="descr">{item.descr}</p>}

                                    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" }}>
                                        <button
                                            className="btn btn-secondary"
                                            style={{ padding: "2px 10px", minWidth: "auto" }}
                                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <span style={{ color: "var(--text)", fontWeight: "500" }}>{item.quantity} шт.</span>
                                        <button
                                            className="btn btn-secondary"
                                            style={{ padding: "2px 8px", minWidth: "auto" }}
                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="bottom">
                    <span className="price">
                      {(Number(item.price) * item.quantity).toLocaleString("ru-KZ")}
                        <span className="price-currency"> тг</span>
                    </span>
                                        <button
                                            className="btn btn-danger"
                                            style={{ background: "#ef4444", borderColor: "#ef4444" }}
                                            onClick={() => onRemove(item.id)}
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Блок итогов */}
                    <div style={{
                        marginTop: "40px",
                        padding: "24px",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-lg)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <div>
                            <span style={{ color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Итого к оплате</span>
                            <span className="price" style={{ fontSize: "28px" }}>
                {totalPrice.toLocaleString("ru-KZ")} <span className="price-currency">тг</span>
              </span>
                        </div>
                        <button className="btn" onClick={() => alert("Заказ оформлен!")}>
                            Оформить заказ
                        </button>
                    </div>
                </>
            ) : (
                <div className="empty-state" style={{ minHeight: "200px" }}>
                    <div className="empty-state-icon">🛒</div>
                    <p>Корзина пока пуста</p>
                    <button className="btn btn-secondary" style={{ marginTop: "16px" }} onClick={() => navigate("/")}>
                        Перейти к покупкам
                    </button>
                </div>
            )}
        </div>
    );
}

export default Basket
