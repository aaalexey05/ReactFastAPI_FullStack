// components/Sidebar/Sidebar.jsx
import React from 'react';
import { Menu } from 'antd';

const Sidebar = ({ collapsed, currencies, onClick }) => {
  return (
    !collapsed && (
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
    )
  );
};

export default Sidebar;