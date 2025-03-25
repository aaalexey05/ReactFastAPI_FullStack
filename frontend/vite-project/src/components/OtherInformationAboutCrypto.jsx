import React, { useState, useEffect } from 'react';
import { Card, Tag, Select } from 'antd';
import { Line } from 'react-chartjs-2'; // Импортируем компонент для графика
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { data } from 'autoprefixer';


// Регистрируем необходимые элементы Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const OtherInformationAboutCrypto = ({ additionalInfo, percentChange }) => {
    const [activeTabKey, setActiveTabKey] = useState('tab1');
    const [selectedCategory, setSelectedCategory] = useState(''); // Состояние для выбранной категории
    const [filteredTags, setFilteredTags] = useState([]); // Состояние для фильтрованных тегов
    const [categoryOptions, setCategoryOptions] = useState([]); // Состояние для категорий

    // Функция для смены активной вкладки
    const onTabChange = (key) => {
        setActiveTabKey(key);
    };

    // Функция для обработки изменения выбранной категории
    const onCategoryChange = (value) => {
        setSelectedCategory(value);
        
        // Фильтруем теги по выбранной категории для текущей валюты
        const filtered = additionalInfo.tagsCurrencyCard.filter(tag => tag.category === value);
        setFilteredTags(filtered);
    };

    // Динамически создаем список категорий на основе тегов валюты
    useEffect(() => {
        if (additionalInfo && additionalInfo.tagsCurrencyCard) {
            // Получаем уникальные категории
            const categories = [...new Set(additionalInfo.tagsCurrencyCard.map(tag => tag.category))];
            setCategoryOptions(categories); // Обновляем список категорий

            // Если категории есть, устанавливаем первую категорию и загружаем теги для нее
            if (categories.length > 0) {
                setSelectedCategory(categories[0]); // Устанавливаем первую категорию как выбранную
                onCategoryChange(categories[0]); // Загружаем теги для первой категории
            }
            else {
                setSelectedCategory(''); // Сбрасываем выбранную категорию
                setFilteredTags([]); // Сбрасываем фильтрованные теги
                return <p>Категории не найдены</p>
            }
        }
    }, [additionalInfo]); // Перезагружаем, если данные валюты изменились


    const chartData = {
        labels: ['1h', '24h', '7d', '30d', '60d', '90d'], // Ось X (временные пррмежутки)
        datasets: [
            {
                label: 'Изменения в процентах',  // Лейбл для линии на графике
                data: [
                    percentChange.percent_change_1h,
                    percentChange.percent_change_24h,
                    percentChange.percent_change_7d,
                    percentChange.percent_change_30d,
                    percentChange.percent_change_60d,
                    percentChange.percent_change_90d,
                ],  // Данные по изменениям 
                borderColor: 'rgba(75, 192, 192, 1)',  // Цвет линии
                tension: 0.1,  // Гладкость линии
            }
        ]
    }

    // Создаем вкладки для отображения
    const tabList = [
        {
            key: 'tab1',
            tab: 'Основная информация',  // Основная информация
        },
        {
            key: 'tab2',
            tab: 'Другая информация',  // Другая информация
        },
        {
            key: 'tab3',
            tab: 'График изменений',  // Графическая информация изменений
        }
    ];

    // Создаем контент для каждой вкладки
    const contentList = {
        // Основная информация
        tab1: (
            <div>
                <p><strong>Цена (в USD):</strong> ${additionalInfo.priceToUSD}</p>
                <p><strong>Капитализация:</strong> ${additionalInfo.marketCap}</p>
                <p><strong>Объем за 24 часа:</strong> ${additionalInfo.volume24h}</p>
            </div>
        ),
        // Другая информация
        tab2: (
            <div>
                <strong>Дополнительная информация</strong> 
                <div>
                    {/* Селектор категорий */}
                    <Select
                        showSearch
                        placeholder="Выберите категорию"
                        onChange={onCategoryChange}
                        value={selectedCategory}
                        size="large" // Увеличиваем размер
                        style={{ width: '100%' }} // Растягиваем на всю ширину
                        options={categoryOptions.map(category => ({
                            value: category,
                            label: category,
                        }))}
                    />
                </div>
                
                {/* Отображаем теги для выбранной категории */}
                <p>                    
                    <br/>
                    {filteredTags.length > 0 ? (
                        filteredTags.map((tag, idx) => (
                            <Tag key={idx}>{tag.name}</Tag>
                        ))
                    ) : (
                        <span>Теги не найдены для этой категории</span>
                    )}
                </p>
            </div>
        ),
        // График изменений
        tab3: (
            <div>
                {/* Отображаем название и график изменений */}
                <h1 
                style={{ textAlign: 'center' }}>
                    График изменений криптовалюты {additionalInfo.currencyName}
                </h1>
                <div style={{ height: 400 }}>
                    <Line data={chartData}/>
                </div>
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
