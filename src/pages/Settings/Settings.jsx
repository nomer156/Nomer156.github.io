import { useEffect, useState } from "react";
import { syncPendingOps } from "../../hooks/useDB.js";
import pkg from "../../../package.json";
import "./Settings.css";

function Settings() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [token, setToken] = useState(() => localStorage.getItem("tgToken") || "");
  const [autoSync, setAutoSync] = useState(() => localStorage.getItem("tgAuto") === "1");
  const [currency, setCurrency] = useState(() => localStorage.getItem("currency") || "RUB");

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("theme-dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("theme-dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("tgToken", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("tgAuto", autoSync ? "1" : "0");
  }, [autoSync]);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  return (
    <div className="settings-page">
      <h1>Настройки</h1>

      <div className="settings__section">
        <span className="settings__label">Тема</span>
        <label className="settings__toggle">
          <input
            type="checkbox"
            checked={dark}
            onChange={() => setDark(!dark)}
          />
          <span className="settings__slider" />
        </label>
      </div>

      <div className="settings__section">
        <span className="settings__label">Telegram</span>
        <input
          className="settings__input"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          type="text"
        />
        <label className="settings__toggle">
          <input
            type="checkbox"
            checked={autoSync}
            onChange={() => setAutoSync(!autoSync)}
          />
          <span className="settings__slider" />
        </label>
      </div>

      <div className="settings__section">
        <span className="settings__label">Валюта</span>
        <select
          className="settings__select"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="RUB">RUB</option>
          <option value="CNY">CNY</option>
          <option value="USD">USD</option>
        </select>
      </div>

      <div className="settings__section">
        <span className="settings__label">Уведомления</span>
        <label
          className="settings__toggle"
          title="Пока доступно в нативном приложении"
        >
          <input type="checkbox" disabled />
          <span className="settings__slider" />
        </label>
        <label
          className="settings__toggle"
          title="Пока доступно в нативном приложении"
        >
          <input type="checkbox" disabled />
          <span className="settings__slider" />
        </label>
      </div>

      <div className="settings__section">
        <span className="settings__label">О приложении</span>
        <span className="settings__about">
          v{pkg.version} • {new Date().toLocaleDateString()}
        </span>
      </div>

      <button className="settings__sync" onClick={syncPendingOps}>
        Обновить сейчас
      </button>
    </div>
  );
}

export default Settings;
