import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.jsx';
import './Car.css';

function Car() {
  const { user, setUser, logout } = useAuth();
  const [vin, setVin] = useState('');
  const navigate = useNavigate();

  const onBindVin = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 500));
    const updated = { ...user, carVin: vin };
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
    navigate('/car');
  };

  if (!user?.carVin) {
    return (
      <div className="car-page">
        <form className="form" onSubmit={onBindVin}>
          <label className="form__label">
            Введите VIN
            <input
              className="form__input"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              required
              minLength={17}
              maxLength={17}
            />
          </label>
          <button className="btn-primary" type="submit">
            Привязать машину
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="car-page">
      <div className="car-card">
        <h2>Моя машина</h2>
        <p>VIN: {user.carVin}</p>
        <p>Пробег: — км</p>
        <button className="btn-primary" onClick={logout}>
          Выйти
        </button>
      </div>
    </div>
  );
}

export default Car;
