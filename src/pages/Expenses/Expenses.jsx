import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import {
  addExpense,
  getExpenses,
} from "../../hooks/useDB.js";
import "./Expenses.css";

function Expenses() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState(getExpenses());
  const doughnutRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const totals = items.reduce((acc, it) => {
      acc[it.category] = (acc[it.category] || 0) + Number(it.sum);
      return acc;
    }, {});

    if (doughnutRef.current) {
      doughnutRef.current.replaceChildren();
      new Chart(doughnutRef.current, {
        type: "doughnut",
        data: {
          labels: Object.keys(totals),
          datasets: [
            {
              data: Object.values(totals),
              backgroundColor: ["#0D47A1", "#2CC3B5", "#FF9800", "#8E24AA"],
            },
          ],
        },
      });
    }

    const monthly = Array(12).fill(0);
    items.forEach((it) => {
      const m = new Date(it.date).getMonth();
      monthly[m] += Number(it.sum);
    });

    if (lineRef.current) {
      lineRef.current.replaceChildren();
      new Chart(lineRef.current, {
        type: "line",
        data: {
          labels: [
            "Янв",
            "Фев",
            "Мар",
            "Апр",
            "Май",
            "Июн",
            "Июл",
            "Авг",
            "Сен",
            "Окт",
            "Ноя",
            "Дек",
          ],
          datasets: [
            {
              data: monthly,
              borderColor: "#0D47A1",
              backgroundColor: "rgba(13,71,161,0.2)",
            },
          ],
        },
      });
    }
  }, [items]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const parts = input.split("-");
    const sum = parseFloat(parts[0]);
    if (isNaN(sum)) return;
    const category = parts.slice(1).join("-").trim();
    const exp = {
      sum,
      category: category || "прочее",
      date: new Date().toISOString(),
    };
    addExpense(exp);
    setItems(getExpenses());
    setInput("");
  };

  return (
    <div className="expenses-page">
      <h1>Расходы</h1>
      <form onSubmit={handleAdd} className="expenses-form">
        <input
          className="expenses-form__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="+ Добавить расход"
        />
      </form>

      <div className="expenses-charts">
        <canvas ref={doughnutRef} className="expenses-chart" />
        <canvas ref={lineRef} className="expenses-chart" />
      </div>

      <ul className="expenses-list">
        {items.map((it) => (
          <li key={it.id} className="expenses-item">
            <span>{it.category}</span>
            <span>{it.sum} ₽</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;
