import './Dashboard.css';
import { useEffect, useState } from 'react';
import CardStat from '../../components/CardStat/CardStat.jsx';
import { getLastExpenses, getMonthlyTotal } from '../../hooks/useDB.js';
import useAuth from '../../hooks/useAuth.jsx';

function Dashboard() {
  const { user, token } = useAuth();
  const [operations, setOperations] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  useEffect(() => {
    getLastExpenses(3).then(setOperations);
    setMonthlyTotal(getMonthlyTotal());
  }, []);

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Добро пожаловать, {user.username}!</h1>

      <div className="dashboard__widgets">
        {user.carVin ? (
          <CardStat title="Масло" />
        ) : (
          <CardStat title="Масло">
            <p>Привяжите машину для расчёта ТО</p>
          </CardStat>
        )}

        <CardStat title="Ближайший штраф" subtitle="Превышение скорости">
          {token && (
            <button
              className="dashboard__pay"
              onClick={() => alert('Оплата пока недоступна')}
            >
              Оплатить
            </button>
          )}
        </CardStat>


        <CardStat title="Расходы месяца" value={`${monthlyTotal} ₽`} />
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
