import { useEffect, useState } from "react";
import "./Parts.css";

function Parts() {
  const [parts, setParts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [tab, setTab] = useState("all");

  useEffect(() => {
    fetch("/data/parts.json")
      .then((r) => r.json())
      .then(setParts)
      .catch(() => setParts([]));
  }, []);

  const categories = ["Все", "Двигатель", "Тормоза", "Подвеска"];

  const filtered = parts.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.oem.includes(search);
    const matchCat = category === "Все" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="parts-page">
      <h1>Запчасти</h1>
      <input
        className="parts-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск..."
      />

      <div className="parts-categories">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={
              "parts-category" + (category === c ? " parts-category--active" : "")
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="parts-tabs">
        {[
          { id: "all", label: "Все" },
          { id: "oem", label: "Оригинал" },
          { id: "analog", label: "Аналоги" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={
              "parts-tab" + (tab === t.id ? " parts-tab--active" : "")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="parts__ai-placeholder">
          AI-подбор недоступен offline (позже GPT-интеграция)
        </div>
      ) : (
        <ul className="parts-list">
          {filtered.map((part) => (
            <li key={part.id} className="part-card">
              <h3 className="part-card__name">{part.name}</h3>
              <p className="part-card__oem">OEM: {part.oem}</p>
              <div className="part-card__analogs">
                {part.analogs.map((a) => (
                  <button
                    key={a}
                    onClick={() => navigator.clipboard.writeText(a)}
                    className="part-card__analog"
                  >
                    {a}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Parts;
