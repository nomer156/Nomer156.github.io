import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    navigate('/');
  };

  return (
    <div className="login-page">
      <h1>Вход</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-form__input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="login-form__input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="login-form__submit" type="submit">
          Войти
        </button>
      </form>
      <Link className="login__link" to="/register">
        Регистрация
      </Link>
    </div>
  );
}

export default Login;
