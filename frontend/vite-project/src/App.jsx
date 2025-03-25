import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Menu, Spin, Avatar, Space, Card, Button } from 'antd';
import axios from 'axios';

import { user } from './utils/testInfoAboutUser.js';
import CryptoCurrencyCard from './components/CryptoCurrencyCard';
import UserInfo from './components/UserInfo.jsx';
import MainPageForAuth from './Auth/MainPageForAuth.jsx'; // Отображение формы входа/регистрации

const { Meta } = Card;

const App = () => {
  const [currencies, setCurrencies] = useState([]); // Состояние для списка криптовалют
  const [currencyId, setCurrencyId] = useState(1); // Состояние для id криптовалюты
  const [currencyData, setCurrencyData] = useState(null); // Состояние для данных криптовалюты
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние для проверки на авторизацию
  const [collapsed, setCollapsed] = useState(false); // Состояние для скрытия/показа меню

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/cryptocurrencies/');
      setCurrencies(response.data);
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };

  const fetchCurrency = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/cryptocurrencies/${currencyId}/`);
      setCurrencyData(response.data);
    } catch (error) {
      console.error('Error fetching currency details:', error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    setCurrencyData(null);
    fetchCurrency();
  }, [currencyId]);

  const onClick = (e) => {
    setCurrencyId(e.key);
  };

  const toggleMenu = () => {
    setCollapsed(!collapsed); // Переключаем состояние меню
  };

  return (
    <Router>
      <Routes>
        {/* Страница входа */}
        {/* <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> */}
        
        {/* Страница регистрации */}
        {/* <Route path="/register" element={<Register />} /> */}

        {/* Защищенная страница профиля */}
        {/* <Route path="/user-info" element={isLoggedIn ? <UserInfo setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />} /> */}

        {/* Главная страница, редирект в зависимости от авторизации */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/user-info" /> : <Navigate to="/login" />} />
      </Routes>

      {/* Основной контент */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Если пользователь не авторизован, показываем форму входа/регистрации */}
        {!isLoggedIn ? (
          <MainPageForAuth setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <>
            {/* Панель управления (видна только если не на странице входа или регистрации) */}
            {window.location.pathname !== '/login' && window.location.pathname !== '/register' && (
              <div style={{ padding: '20px', background: '#f0f2f5', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '80px' }}>
                <Button onClick={toggleMenu} style={{ marginRight: '20px' }}>
                  {collapsed ? 'Показать меню' : 'Скрыть меню'}
                </Button>
              </div>
            )}
            <div className="flex">
              {/* Меню с криптовалютами, которое скрывается/показывается */}
              {!collapsed && (
                <Menu
                  onClick={onClick}
                  style={{ width: 256 }}
                  defaultSelectedKeys={['1']}
                  mode="inline"
                  items={currencies.map(c => ({
                    key: c.id.toString(),
                    label: (
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${c.id}.png`} 
                          alt={`${c.name}`} 
                          style={{ width: '30px', height: '30px' }}
                        />
                        <span>{c.name}</span>
                      </div>
                    ),
                  }))}
                  className="h-screen overflow-scroll"
                />
              )}

              {/* Блок профиля пользователя в правом верхнем углу */}
              <Space direction="vertical" size={16} style={{ position: 'absolute', top: '20px', right: '20px' }}>
                <Space className="flex items-center gap-3">
                  <Meta avatar={<Avatar src={user.avatarUrl} />} />
                  <UserInfo setIsLoggedIn={setIsLoggedIn} />
                </Space>
              </Space>

              {/* Карточка с криптовалютой, которая всегда по центру */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                {currencyData ? (
                  <CryptoCurrencyCard currency={currencyData} />
                ) : (
                  <div className="flex items-center justify-center h-screen">
                    <Spin size="large" />
                    <p>Выберите криптовалюту для просмотра данных</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
