import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios'

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import MainPageForAuth from './Auth/MainPageForAuth.jsx'; 
import CryptoCurrencyCard from './components/CryptoCurrencyCard';
import { Spin, Button } from 'antd';
import UserInfo from './components/UserInfo';

// Компоненты для маршрутов
import HomePage from './utils/pages/HomePage.jsx'
import NewsPage from './utils/pages/NewsPage.jsx'
import ContactPage from './utils/pages/ContactPage.jsx'

const App = () => {
  const [currencies, setCurrencies] = useState([]); 
  const [currencyId, setCurrencyId] = useState(1);
  const [currencyData, setCurrencyData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Получаем список криптовалют
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/cryptocurrencies/');
        setCurrencies(response.data);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    // Загружаем данные о криптовалюте
    const fetchCurrency = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/cryptocurrencies/${currencyId}/`);
        setCurrencyData(response.data);
      } catch (error) {
        console.error('Error fetching currency details:', error);
      }
    };

    fetchCurrency();
  }, [currencyId]);

  console.log(localStorage.getItem("access_token")); // Должен выводить токен после входа

  const onClick = (e) => setCurrencyId(e.key);
  const toggleMenu = () => setCollapsed(!collapsed);

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/cryptocurrencies" /> : <Navigate to="/login" />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/news' element={<NewsPage />} />
      </Routes>

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {!isLoggedIn ? (
          <MainPageForAuth setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <>
            <div style={{ padding: '20px', background: '#fafafa', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '80px' }}>
              <Button onClick={toggleMenu} style={{ marginRight: '20px' }}>
                {collapsed ? 'Показать меню' : 'Скрыть меню'}
              </Button>
            </div>

            <div className="flex" style={{ display: 'flex', flexGrow: 1 }}>
              {/* Меню с криптовалютами */}
              <Sidebar collapsed={collapsed} currencies={currencies} onClick={onClick} />

              {/* Контент */}
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

            <UserInfo setIsLoggedIn={setIsLoggedIn} />
          </>
        )}
      </div>

      <Footer isLoggedIn={isLoggedIn} />
    </Router>
  );
};

export default App;
