import React, { useState } from 'react';
import { Card } from 'antd'


const tabList = [
    {
        key: 'tab1',
        tab: 'tab1',
    },
    {
        key: 'tab2',
        tab: 'tab2',
    },
];

const contentList = {
    tab1 : <p>Content1</p>,
    tab2 : <p>Content2</p>,
};


const OtherInformationAboutCrypto = ({ }) => {
    const [activeTabKey1, setActiveTabKey1] = useState('tab1');
    const onTab1Change = (key) => {
        setActiveTabKey1(key);
    };



    return (
        <div>
            {/* Компонент для отображения другой информации о криптовалюте */}
            <div className="other-information">
                {/* <h1 className='align-center'>Другая информация (ДОРАБОТАТЬ!!!)</h1> */}
                <br/>
                    <Card
                        style={{
                        width: '100%',
                        }}
                        title="Card title"
                        tabList={tabList}
                        activeTabKey={activeTabKey1}
                        onTabChange={onTab1Change}
                    >
                    {contentList[activeTabKey1]}
                </Card>
            </div>
        </div>
    );
};

export default OtherInformationAboutCrypto;