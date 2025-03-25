import React from 'react';
import { Tabs } from 'antd';
import Login from './Login';
import Register from './Register';
import WelcomePage from './WelcomePage';  // Импортируем WelcomePage

const MainPageForAuth = ({ setIsLoggedIn }) => {
  return (
    <div className="main-auth-container">
      <WelcomePage />  {/* Добавляем компонент WelcomePage */}
      
      <div className="form-container">
        <h2>Добро пожаловать!</h2>
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
