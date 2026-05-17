import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPage({ products, onSave, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = products.find((p) => p.id === Number(id));

  const [tempItem, setTempItem] = useState(item);

  useEffect(() => {
    if (item) {
      setTempItem(item);
    }
  }, [item]);

  if (!item) return <div className="page">Товар не найден</div>;

  const handleSave = () => {
    onSave(tempItem);
    navigate("/admin");
  };

  const handleDelete = () => {
    onDelete(tempItem.id);
    navigate("/admin");
  };

  return (
    <div className="page">
      <div className="edit-form">
        <h2>Редактирование</h2>
        <input
          value={tempItem.name}
          onChange={(e) => setTempItem({ ...tempItem, name: e.target.value })}
        />
        <input
          type="number"
          value={tempItem.price}
          onChange={(e) =>
            setTempItem({ ...tempItem, price: Number(e.target.value) })
          }
        />
        <textarea
          value={tempItem.descr}
          onChange={(e) => setTempItem({ ...tempItem, descr: e.target.value })}
        />
        <input
          placeholder="Ссылка на картинку"
          value={tempItem.img || ""}
          onChange={(e) => setTempItem({ ...tempItem, img: e.target.value })}
        />

        <button className="btn" onClick={handleSave}>
          Сохранить
        </button>

        <button
          className="btn"
          style={{ background: "#ef4444", marginTop: "10px" }}
          onClick={handleDelete}
        >
          Удалить товар
        </button>
      </div>
    </div>
  );
}
