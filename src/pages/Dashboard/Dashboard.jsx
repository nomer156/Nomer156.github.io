import "./Dashboard.css";
import CardStat from '../../components/CardStat/CardStat.jsx';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Добро пожаловать, Алексей!</h1>
      <p className="dashboard__mileage">Текущий пробег: 82 350 км</p>
      <CardStat title="Статус масла">
        <p>2650 км (45 дней до замены)</p>
        <div className="dashboard__progress">
          <div className="dashboard__progress-bar" style={{ width: '75%' }} />
        </div>
      </CardStat>
      <CardStat title="Выдающий штраф">
        <p>1500 ₽</p>
        <button className="dashboard__pay">Оплатить</button>
      </CardStat>
      <button className="dashboard__add">+</button>
    </div>
  );
}

export default Dashboard;
