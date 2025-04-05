import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css'
import logotype from './../../utils/img/logo.png'

const Footer = ({ isLoggedIn }) => {
  return (
    <footer className="footer">

      {/* Сделать кликабельную картинку с путем на главную страницу!!! */}

        <NavLink to="/home">
          <img src={logotype} alt="Logotype Infee" style={{width: "80px", height: "80px", alignContent: "center", margin: "auto 2.5vw"}} />        
        </NavLink> {/* При клике переходим на путь '/' */}
        

      {isLoggedIn ? (
        // Отображение Footer для залогиненых пользователей
      <div className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink
            to="/home"
          >
            Главная
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/cryptocurrencies"
          >
            Информация о криптовалютах
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/news"
          >
            Новости
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/contact"
          >
            Контактная информация
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/contact"
          >
            Обратиться в поддержку
          </NavLink>
        </li>
      </ul>
    </div>
        ) : (
          // Отображение Footer для гостей
          <div className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink
                to="/home"
              >
                Главная
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/news"
              >
                Новости
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
              >
                Контактная информация
              </NavLink>
            </li>
          </ul>
        </div>
        )}

      <p className="footer-text">{new Date().getFullYear()} © Infee</p>
    </footer>
  );
};

export default Footer;
