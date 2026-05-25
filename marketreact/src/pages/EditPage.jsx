import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPage({ products, onSave, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = products.find((p) => p.id === Number(id));
  const [tempItem, setTempItem] = useState(item);

  useEffect(() => {
    if (item) setTempItem(item);
  }, [item]);

  if (!item) {
    return (
        <div className="page">
          <div className="not-found">
            <div className="not-found-icon">🔍</div>
            <h3>Товар не найден</h3>
            <button className="btn btn-secondary" onClick={() => navigate("/admin")}>
              Вернуться в Админку
            </button>
          </div>
        </div>
    );
  }

  const handleSave = () => {
    onSave(tempItem);
    navigate("/admin");
  };

  const handleDelete = () => {
    if (window.confirm(`Удалить "${tempItem.name}"?`)) {
      onDelete(tempItem.id);
      navigate("/admin");
    }
  };

  return (
      <div className="form-page">
        <div className="edit-form">
          <h2>Редактирование</h2>

          <input
              placeholder="Название товара"
              value={tempItem.name}
              onChange={(e) => setTempItem({ ...tempItem, name: e.target.value })}
          />
          <input
              type="number"
              placeholder="Цена, тг"
              min="0"
              value={tempItem.price}
              onChange={(e) =>
                  setTempItem({ ...tempItem, price: Number(e.target.value) })
              }
          />
          <textarea
              placeholder="Описание товара"
              value={tempItem.descr}
              onChange={(e) => setTempItem({ ...tempItem, descr: e.target.value })}
          />
          <input
              placeholder="Ссылка на изображение (URL)"
              value={tempItem.img || ""}
              onChange={(e) => setTempItem({ ...tempItem, img: e.target.value })}
          />

          <div className="btn-group">
            <button className="btn btn-full" onClick={handleSave}>
              Сохранить изменения
            </button>
            <button
                className="btn btn-secondary btn-full"
                onClick={() => navigate("/admin")}
            >
              Назад
            </button>
            <div className="form-divider" />
            <button className="btn btn-danger btn-full" onClick={handleDelete}>
              Удалить товар
            </button>
          </div>
        </div>
      </div>
  );
}