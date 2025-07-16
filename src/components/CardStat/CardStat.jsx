import './CardStat.css';

function CardStat({ title, children }) {
  return (
    <div className="card-stat">
      <h2 className="card-stat__title">{title}</h2>
      {children}
    </div>
  );
}

export default CardStat;
