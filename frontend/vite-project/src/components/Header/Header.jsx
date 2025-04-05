import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; // Импортируем CSS файл для стилей шапки

const Header = ({ isLoggedIn }) => {
  return (
    <header className="header">
      {/* Кликабельное название */}
      <NavLink to="/home" className="header-title">Infee</NavLink> {/* При клике переходим на путь '/' */}

      {isLoggedIn ? (
        // Вход для зарегистрированных пользователей
                <div className="nav">
                <ul className="nav-list">
                  <li className="nav-item">
                    <NavLink
                      to="/home"
                      className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                      Главная
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/cryptocurrencies"
                      className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                      Криптовалюты
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/news"
                      className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                      Новости
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/contact"
                      className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                      Контактная информация
                    </NavLink>
                  </li>
                </ul>
              </div>
      ) : (
        // Footer для гостей
        <div className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink
              to="/home"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Главная
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/news"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Новости
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/contact"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Контактная информация
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/login"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Вход/регистрация
            </NavLink>
          </li>
        </ul>
      </div>
      )}
 {/* Элементы меню справа */}
    </header>
  );
};

export default Header;
