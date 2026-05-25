import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPage = ({ onAdd }) => {
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    descr: "",
    img: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const productWithId = {
      ...newItem,
      id: Date.now(),
      price: Number(newItem.price),
    };
    onAdd(productWithId);
    navigate("/");
  };

  return (
      <div className="form-page">
        <form className="edit-form" onSubmit={handleSubmit}>
          <h2>Новый товар</h2>

          <input
              placeholder="Название товара"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
          />
          <input
              placeholder="Цена, тг"
              type="number"
              min="0"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              required
          />
          <textarea
              placeholder="Описание товара"
              value={newItem.descr}
              onChange={(e) => setNewItem({ ...newItem, descr: e.target.value })}
          />
          <input
              placeholder="Ссылка на изображение (URL)"
              value={newItem.img}
              onChange={(e) => setNewItem({ ...newItem, img: e.target.value })}
          />

          <div className="btn-group">
            <button className="btn btn-full" type="submit">
              Создать товар
            </button>
            <button
                type="button"
                className="btn btn-secondary btn-full"
                onClick={() => navigate("/")}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
  );
};

export default AddPage;