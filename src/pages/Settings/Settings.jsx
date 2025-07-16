import { useEffect, useState } from "react";
import { syncPendingOps } from "../../hooks/useDB.js";
import "./Settings.css";

function Settings() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

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
      <button className="settings__sync" onClick={syncPendingOps}>
        Обновить сейчас
      </button>
    </div>
  );
}

export default Settings;
