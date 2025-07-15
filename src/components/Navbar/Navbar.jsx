import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const links = [
    { to: '/', label: 'Главная', icon: 'home' },
    { to: '/car', label: 'Моя машина', icon: 'car' },
    { to: '/parts', label: 'Запчасти', icon: 'parts' },
    { to: '/expenses', label: 'Расходы', icon: 'expenses' },
    { to: '/settings', label: 'Настройки', icon: 'settings' },
  ];

  return (
    <nav className="navbar">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            'navbar__button' + (isActive ? ' navbar__button--active' : '')
          }
        >
          <span className="icon icon-placeholder" aria-hidden />
          <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
