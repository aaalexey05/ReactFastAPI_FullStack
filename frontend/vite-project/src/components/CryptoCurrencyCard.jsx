import { Card, Row, Button } from 'antd';
import ModalForChange from './ModalForChange';
import './../index.css';
import React, { useState } from 'react';

// Функция для форматирования даты
function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) {
        return 'Дата не доступна';
    }
    return date.toLocaleDateString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function CryptoCurrencyCard(props) {
    const { currency } = props;
    console.log(currency);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Функция для открытия модального окна
    const showModal = () => {
        setIsModalOpen(true);
    };

    // Функция для закрытия модального окна
    const hideModal = () => {
        setIsModalOpen(false);
    };

    // Функция для имитации загрузки данных
    const reloadModal = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Простая имитация загрузки данных
    };

    // Процентные изменения
    const percentChanges = {
        percent_change_1h: currency.quote.USD.percent_change_1h,
        percent_change_24h: currency.quote.USD.percent_change_24h,
        percent_change_7d: currency.quote.USD.percent_change_7d,
        percent_change_30d: currency.quote.USD.percent_change_30d,
        percent_change_60d: currency.quote.USD.percent_change_60d,
        percent_change_90d: currency.quote.USD.percent_change_90d,
    };

    const additionalInfo = {
        currencyName: currency.name,
        tagsCurrencyCard: currency.tags,
        priceToUSD: currency.quote.USD.price,
        marketCap: currency.quote.USD.market_cap,
        volume24h: currency.quote.USD.volume_24h,
    };

    const nameValuteForModalChange = currency.name;
    const price = currency.quote.USD.price.toFixed(2);

    if (!currency) {
        return <div>Загрузка...</div>;
    }

    const formattedDateLastUpdated = formatDate(currency.last_updated);
    const formattedDateAdded = formatDate(currency.date_added);

    return (
        <>
            <Card
                title={
                    <div className="flex items-center gap-3">
                        <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`} alt={`${currency.name}`} width={50}/>
                        <span>{currency.name}</span>
                    </div>
                }
                style={{
                    width: 350,
                }}
            >
                <p>Текущая цена: {price}$</p>
                <p>Дата обновления: {formattedDateLastUpdated}</p>
                <p>Дата добавления: {formattedDateAdded}</p>
                <Button 
                    style={{"backgroundColor": "#064e3b"}} 
                    type="primary" 
                    onClick={showModal}>
                    Показать информацию
                </Button>
            </Card>

            {/* Modal with Percent Changes */}
            <ModalForChange
                isOpen={isModalOpen}
                onClose={hideModal}
                percentChanges={percentChanges}
                nameValuteForModalChange={nameValuteForModalChange}
                loading={loading}
                onReload={reloadModal}
                additionalInfo={additionalInfo} // Передаем additionalInfo в ModalForChange
            />
        </>
    );
}

export default CryptoCurrencyCard;