import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import {
  getCarInfo,
  saveCarInfo,
  getMods,
} from "../../hooks/useDB.js";
import "./Car.css";

function Car() {
  const { user, setUser } = useAuth();
  const initial = getCarInfo();
  const [vin, setVin] = useState(initial.vin || "");
  const [mileage, setMileage] = useState(initial.mileage || "");
  const [tab, setTab] = useState("mods");
  const [bindVin, setBindVin] = useState("");
  const mods = getMods();

  const handleBind = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 500));
    const updated = { ...user, carVin: bindVin };
    setUser(updated);
    localStorage.setItem('carVin', bindVin);
    localStorage.setItem('user', JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const info = { vin, mileage };
    saveCarInfo(info);
  };

  return (
    <div className="car-page">
      <h1>Моя машина</h1>
      {!user?.carVin ? (
        <form className="vin-bind" onSubmit={handleBind}>
          <input
            className="vin-bind__input"
            value={bindVin}
            onChange={(e) => setBindVin(e.target.value)}
            placeholder="VIN"
          />
          <button className="vin-bind__button" type="submit">
            Привязать машину
          </button>
        </form>
      ) : (
        <div className="vin-card">VIN: {user.carVin}</div>
      )}
      <form className="car-form" onSubmit={handleSubmit}>
        <label className="car-form__label">
          VIN
          <input
            className="car-form__input"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
          />
        </label>
        <label className="car-form__label">
          Пробег
          <input
            className="car-form__input"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
          />
        </label>
        <button className="car-form__save" type="submit">
          Сохранить
        </button>
      </form>

      {vin && (
        <div className="car-info">
          <p className="car-info__text">VIN: {vin}</p>
          <p className="car-info__text">Пробег: {mileage} км</p>
          <button className="car-info__qr">QR-код</button>
        </div>
      )}

      <div className="car-tabs">
        <button
          className={"car-tabs__btn" + (tab === "mods" ? " car-tabs__btn--active" : "")}
          onClick={() => setTab("mods")}
        >
          Модификации
        </button>
        <button
          className={"car-tabs__btn" + (tab === "history" ? " car-tabs__btn--active" : "")}
          onClick={() => setTab("history")}
        >
          История работ
        </button>
      </div>

      {tab === "mods" ? (
        <div className="car-mods">
          {mods.length === 0 && <p className="car__empty">Нет модификаций</p>}
          {mods.map((m) => (
            <div key={m.id} className="car__mod-item">
              {m.title}
            </div>
          ))}
          <Link className="car__add-mod" to="/mods/new">
            ➕ Добавить мод
          </Link>
        </div>
      ) : (
        <p className="car__empty">Записей нет</p>
      )}
    </div>
  );
}

export default Car;
