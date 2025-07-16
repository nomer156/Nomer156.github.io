import { useEffect, useState } from "react";
import "./Parts.css";

function Parts() {
  const [parts, setParts] = useState([]);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("Все");
  const [tab, setTab] = useState("all");

  useEffect(() => {
    const load = async () => {
      await new Promise((r) => setTimeout(r, 500));
      setParts([
        {
          id: 1,
          name: "Масляный фильтр",
          oem: "0001",
          category: "Двигатель",
          analogs: ["A1", "A2"],
        },
        {
          id: 2,
          name: "Тормозные колодки",
          oem: "0002",
          category: "Тормоза",
          analogs: ["B1"],
        },
      ]);
    };
    load();
  }, []);

  const categories = ["Все", "Двигатель", "Тормоза", "Подвеска"];

  const filtered = parts.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(filter.toLowerCase()) ||
      p.oem.includes(filter);
    const matchCat = category === "Все" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="parts-page">
      <h1>Запчасти</h1>
      <input
        className="parts-search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
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
          { id: "oem", label: "Originals" },
          { id: "analog", label: "Analogs" },
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
          AI-подбор пока не доступен offline
        </div>
      ) : (
        <ul className="parts__list">
          {filtered.map((part) => (
            <li key={part.id} className="parts__card">
              <h3 className="parts__card-name">{part.name}</h3>
              <p className="parts__card-oem">OEM: {part.oem}</p>
              <div className="parts__card-analogs">
                {part.analogs.map((a) => (
                  <button
                    key={a}
                    onClick={() => navigator.clipboard.writeText(a)}
                    className="parts__card-analog"
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
