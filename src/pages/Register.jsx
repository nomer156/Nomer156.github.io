import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(username, password);
    navigate('/login');
  };

  return (
    <div className="register-page">
      <h1>Регистрация</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          className="register-form__input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="register-form__input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register-form__submit" type="submit">
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
