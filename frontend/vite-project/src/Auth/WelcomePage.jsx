import React from 'react';
import './background.scss';  // Подключаем стили для фона

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      {/* Задний фон с анимацией звезд */}
      <div className="stars">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>

      {/* Приветственное сообщение */}
      <div className="welcome-message"></div>
    </div>
  );
};

export default WelcomePage;
