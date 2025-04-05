import React from 'react';
import { Tabs } from 'antd';
import Login from './Login';
import Register from './Register';
import WelcomePage from './WelcomePage';  // Импортируем WelcomePage
import './background.scss';  // Подключаем стили
import './MainPageForAuth.css'

const MainPageForAuth = ({ setIsLoggedIn }) => {
  return (
    <div className="main-auth-container">
      <WelcomePage />  {/* Добавляем компонент WelcomePage */}

      <ul className="container">
          <li className="neon-text" style={{'--i': 1}}>Д</li>
          <li className="neon-text" style={{'--i': 1.2}}>о</li>
          <li className="neon-text" style={{'--i': 1.4}}>б</li>
          <li className="neon-text" style={{'--i': 1.6}}>р</li>
          <li className="neon-text" style={{'--i': 1.8}}>о</li>
          <span></span>
          <li className="neon-text" style={{'--i': 2.0}}>п</li>
          <li className="neon-text" style={{'--i': 2.2}}>о</li>
          <li className="neon-text" style={{'--i': 2.4}}>ж</li>
          <li className="neon-text" style={{'--i': 2.6}}>а</li>
          <li className="neon-text" style={{'--i': 2.8}}>л</li>
          <li className="neon-text" style={{'--i': 3.0}}>о</li>
          <li className="neon-text" style={{'--i': 3.2}}>в</li>
          <li className="neon-text" style={{'--i': 3.4}}>а</li>
          <li className="neon-text" style={{'--i': 3.4}}>т</li>
          <li className="neon-text" style={{'--i': 3.4}}>ь</li>
          <li className="neon-text" style={{'--i': 3.4}}>!</li>
      </ul>

      <div className="form-container">
        <Tabs defaultActiveKey="login">
          <Tabs.TabPane tab="Вход" key="login">
            <Login setIsLoggedIn={setIsLoggedIn} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Регистрация" key="register">
            <Register />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default MainPageForAuth;
