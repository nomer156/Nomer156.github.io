import { useState } from "react";
import {
  getCarInfo,
  saveCarInfo,
  getMods,
} from "../../hooks/useDB.js";
import "./Car.css";

function Car() {
  const initial = getCarInfo();
  const [vin, setVin] = useState(initial.vin || "");
  const [mileage, setMileage] = useState(initial.mileage || "");
  const [tab, setTab] = useState("mods");
  const mods = getMods();

  const handleSubmit = (e) => {
    e.preventDefault();
    const info = { vin, mileage };
    saveCarInfo(info);
  };

  return (
    <div className="car-page">
      <h1>Моя машина</h1>
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
        <ul className="car-mods">
          {mods.length === 0 && <li>Нет модификаций</li>}
          {mods.map((m) => (
            <li key={m.id}>{m.title}</li>
          ))}
        </ul>
      ) : (
        <p>Нет записей</p>
      )}
    </div>
  );
}

export default Car;
