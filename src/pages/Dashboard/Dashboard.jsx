import './Dashboard.css';
import { useEffect, useState } from 'react';
import CardStat from '../../components/CardStat/CardStat.jsx';
import AdsPlaceholder from '../../components/AdsPlaceholder/AdsPlaceholder.jsx';
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
        <CardStat title="Статус масла">
          <p>2650 км / 45 дней до замены</p>
          <div className="dashboard__progress">
            <div className="dashboard__progress-bar" style={{ width: '75%' }} />
          </div>
        </CardStat>

        <CardStat title="Выдающий штраф">
          <p>1500 ₽ • превышение</p>
          <button
            className="dashboard__pay"
            onClick={() => alert('Оплата пока недоступна')}
          >
            Оплатить
          </button>
        </CardStat>

        <CardStat title="Расходы месяца">
          <p>18 750 ₽ / бюджет 25 000 ₽</p>
          <div className="dashboard__progress">
            <div className="dashboard__progress-bar" style={{ width: '75%' }} />
          </div>
        </CardStat>

        <AdsPlaceholder />
      </div>

      <div className="operations">
        <h3 className="operations__title">Последние операции</h3>
        <ul className="operations__list">
          {operations.map((op) => (
            <li key={op.id} className="operations__item">
              <span>{op.description}</span>
              <span>{op.sum} ₽</span>
            </li>
          ))}
        </ul>
      </div>

      <button className="dashboard__add">+</button>
    </div>
  );
}

export default Dashboard;
