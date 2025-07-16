import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!username) errs.username = true;
    if (!password) errs.password = true;
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      await register(username, password);
      navigate('/');
    }
  };

  return (
    <div className="register-page">
      <h1>Регистрация</h1>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <label className="form__label">
          Username
          <input
            className="form__input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <span className="form__error">Обязательное поле</span>
          )}
        </label>
        <label className="form__label">
          Password
          <input
            className="form__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="form__error">Обязательное поле</span>
          )}
        </label>
        <button className="btn-primary" type="submit">
          Создать аккаунт
        </button>
      </form>
      <Link className="register__link" to="/login">
        Уже есть аккаунт?
      </Link>
    </div>
  );
}

export default Register;
