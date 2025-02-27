// ModalWithPercentChanges.js
import React from 'react';
import { Modal, Button, Row, Col } from 'antd';
import CryptoPercentChangeCard from './CryptoPercentChangeCard';
import OtherInformationAboutCrypto from './OtherInformationAboutCrypto';


// Компонент модального окна с процентными изменениями
const ModalWithPercentChanges = ({ isOpen, onClose, percentChanges, nameValuteForModalChange, loading, onReload }) => {

    const titleChanges = {
        title_change_1h: "Изменения за 1 час",
        title_change_24h: "Изменения за 24 часа",
        title_change_7d: "Изменения за 7 дней",
        title_change_30d: "Изменения за 30 дней",
        title_change_60d: "Изменения за 60 дней",
        title_change_90d: "Изменении за 90 дней",
    }

    return (
        <Modal
            title={`Информация о ${nameValuteForModalChange}`}
            open={isOpen}
            onCancel={onClose}
            footer={
                <Button 
                    style={{"backgroundColor": "#064e3b"}} 
                    type="primary" 
                    onClick={onReload}
                >
                    Обновить данные
                </Button>
            }
            loading={loading}
        >
            <Row gutter={24}>
                <Col span={12}>
                    <CryptoPercentChangeCard 
                        title={titleChanges.title_change_1h}
                        percent_change={percentChanges.percent_change_1h}
                    />
                </Col>
                <Col span={12}>
                    <CryptoPercentChangeCard 
                        title={titleChanges.title_change_30d}
                        percent_change={percentChanges.percent_change_30d}
                    />
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <CryptoPercentChangeCard 
                        title={titleChanges.title_change_24h}
                        percent_change={percentChanges.percent_change_24h}
                    />
                </Col>
                <Col span={12}>
                    <CryptoPercentChangeCard 
                        title={titleChanges.title_change_60d}
                        percent_change={percentChanges.percent_change_60d}
                    />
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <CryptoPercentChangeCard 
                        title={titleChanges.title_change_7d}
                        percent_change={percentChanges.percent_change_7d}
                    />
                </Col>
                <Col span={12}>
                    <CryptoPercentChangeCard 
                        title={titleChanges.title_change_90d}
                        percent_change={percentChanges.percent_change_90d}
                    />
                </Col>
            </Row>

            <OtherInformationAboutCrypto/>
            
        </Modal>
    );
};

export default ModalWithPercentChanges;
