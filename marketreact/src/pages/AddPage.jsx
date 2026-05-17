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

    navigate("/admin");
  };

  return (
    <div className="page">
      <form className="edit-form" onSubmit={handleSubmit}>
        <h2>Добавить новый товар</h2>
        <input
          placeholder="Название"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <input
          placeholder="Цена"
          type="number"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          required
        />
        <textarea
          placeholder="Описание"
          value={newItem.descr}
          onChange={(e) => setNewItem({ ...newItem, descr: e.target.value })}
        ></textarea>
        <input
          placeholder="Ссылка на картинку"
          value={newItem.img}
          onChange={(e) => setNewItem({ ...newItem, img: e.target.value })}
        />
        <button className="btn" type="submit">
          Создать товар
        </button>
      </form>
    </div>
  );
};

export default AddPage;
