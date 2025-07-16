import './Dashboard.css';
import { useEffect, useState } from 'react';
import CardStat from '../../components/CardStat/CardStat.jsx';
import { getLastExpenses } from '../../hooks/useDB.js';

function Dashboard() {
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    getLastExpenses(3).then(setOperations);
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Добро пожаловать, Алексей!</h1>
      <p className="dashboard__mileage">Текущий пробег: 82 350 км</p>

      <div className="dashboard__widgets">
        <CardStat title="Масло" value="2650 км" subtitle="45 дней до замены" />

        <CardStat
          title="Ближайший штраф"
          value="1500 ₽"
          subtitle="Превышение скорости"
        >
          <button
            className="dashboard__pay"
            onClick={() => alert('Оплата пока недоступна')}
          >
            Оплатить
          </button>
        </CardStat>


        <CardStat
          title="Расходы месяца"
          value="18 750 ₽"
          subtitle="Бюджет 25 000 ₽"
        />
      </div>

      <ul className="operations">
        {operations.map((op) => (
          <li key={op.id} className="operations__item">
            <span>{op.description}</span>
            <span>{op.sum} ₽</span>
          </li>
        ))}
      </ul>

      <button className="dashboard__add">+</button>
    </div>
  );
}

export default Dashboard;
