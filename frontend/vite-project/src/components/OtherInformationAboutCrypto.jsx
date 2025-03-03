import React, { useState } from 'react';
import { Card, Tag } from 'antd';

const OtherInformationAboutCrypto = ({ additionalInfo }) => {
    const [activeTabKey, setActiveTabKey] = useState('tab1');

    // Функция для смены активной вкладки
    const onTabChange = (key) => {
        setActiveTabKey(key);
    };

    // Создаем вкладки для отображения
    const tabList = [
        {
            key: 'tab1',
            tab: 'Основная информация',  // Основная информация
        },
        {
            key: 'tab2',
            tab: 'Другая...',  // Другая информация
        },
    ];

    // Создаем контент для каждой вкладки
    const contentList = {
        tab1: (
            <div>
                <p><strong>Цена (в USD):</strong> ${additionalInfo.priceToUSD}</p>
                <p><strong>Капитализация:</strong> ${additionalInfo.marketCap}</p>
                <p><strong>Объем за 24 часа:</strong> ${additionalInfo.volume24h}</p>
            </div>
        ),
        tab2: (
            <div>
                <p>
                    <strong>Дополнительная информация (tags and more) </strong> <br/>
                    {additionalInfo.tagsCurrencyCard.map((i, idx) => {
                        return <Tag key={idx}>{i.name}</Tag>
                    })}
                </p>
                {/* Дополнительная информация, если есть */}
            </div>
        ),
    };


    return (
        <div>
            <div className="other-information">
                <br />
                <Card
                    style={{
                        width: '100%',
                    }}
                    title={`Дополнительная информация о ${additionalInfo.currencyName}`}
                    tabList={tabList}
                    activeTabKey={activeTabKey}
                    onTabChange={onTabChange}
                >
                    {contentList[activeTabKey]}
                </Card>
            </div>
        </div>
    );
};

export default OtherInformationAboutCrypto;
