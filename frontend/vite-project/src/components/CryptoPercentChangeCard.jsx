import React from 'react';

import { Card, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';


// Компонент для отображения процентного изменения
const CryptoPercentChangeCard = (props) => {
    const { percent_change } = props
    const {title} = props

    // Определяем точность в зависимости от процентного изменения
    const precision = Math.abs(percent_change) < 0.01 ? 4 : 2;

    return (
        <>
            <Card variant="borderless">
                <Statistic
                title={title}
                value={percent_change}
                precision={precision}
                valueStyle={ percent_change < 0 ? { color: '#cf1322' } : { color: '#3f8600' }}
                prefix={percent_change < 0 ? <ArrowDownOutlined/> : <ArrowUpOutlined />}
                suffix="%"
                />
            </Card>
        </>
    );
};

export default CryptoPercentChangeCard;