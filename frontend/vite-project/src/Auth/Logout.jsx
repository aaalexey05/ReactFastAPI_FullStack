import React from 'react';
import { Button, notification } from 'antd';

function Logout({ setIsLoggedIn }) {
    const handleLogout = () => {
        // Удаляем токен из localStorage
        localStorage.removeItem('access_token');
        
        // Устанавливаем состояние в false (пользователь не авторизован)
        setIsLoggedIn(false);
        
        // Показываем уведомление пользователю
        notification.success({
            message: 'Успешный выход',
        });
    }


    return (
        <Button 
            type='primary' 
            onClick={handleLogout}
        >
            Выйти из аккаунта
        </Button>
    );
}

export default Logout;