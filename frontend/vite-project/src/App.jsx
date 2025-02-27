import React, { useEffect, useState } from 'react';
import { Menu, Spin, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import CryptoCurrencyCard from './components/CryptoCurrencyCard';

const App = () => {

  const [currencies, setCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState(1);
  const [currencyData, setCurrencyData] = useState(null);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/cryptocurrencies/');
      const currenciesData = response.data;

      const menuItems = [
        {
          key: 'g1',
          label: 'Список криптовалют',
          children: currenciesData.map(c => ({
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
          }))
        }
      ];

      setCurrencies(menuItems);
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
  }, []);

  useEffect(() => {
    setCurrencyData(null);
    fetchCurrency();
  }, [currencyId]);

  const onClick = (e) => {
    setCurrencyId(e.key);
  };

  return (
    <>
      {currencies.length === 0 ? (
        <div className="flex items-center justify-center text-2xl h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="flex">
            <Menu
              onClick={onClick}
              style={{ width: 256}}
              defaultSelectedKeys={['1']}
              mode="inline"
              items={currencies}
              className="h-screen overflow-scroll"
            />

          {/* Значок и имя пользователя (В ДАННЫЙ МОМЕНТ НЕ КЛИКАБЕЛЬНО!!!) */}
          <Space
              direction="vertical"
              size={16}
              className="absolute top-0 right-0 p-4"
            >
              <Space className="flex items-center gap-3">
                <Avatar size={32} icon={<UserOutlined />} />
                <span>Имя пользователя</span>
              </Space>
            </Space>

            <div className="mx-auto my-auto">
              {/* Render currency data */}
              {currencyData ? (
                <CryptoCurrencyCard currency={currencyData} />
              ) : (
              <div className="flex items-center justify-center h-screen">
                <Spin size='large' className="flex items-center justify-center" />
                <p>Выберите криптовалюту для просмотра данных</p>
              </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;
