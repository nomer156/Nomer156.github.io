import './CardStat.css';

function CardStat({ title, value, subtitle, children }) {
  return (
    <div className="card-stat">
      <h2 className="card-stat__title">{title}</h2>
      {value && <p className="card-stat__value">{value}</p>}
      {subtitle && <p className="card-stat__subtitle">{subtitle}</p>}
      {children}
    </div>
  );
}

export default CardStat;
