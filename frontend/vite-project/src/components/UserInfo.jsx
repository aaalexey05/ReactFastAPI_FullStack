import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Avatar, Space, notification, Upload, Popconfirm } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import ChangePassword from '../Auth/ChangePassword.jsx';
import Logout from '../Auth/Logout.jsx';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const UserInfo = ({ setIsLoggedIn }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Для отображения модалки для аватара и фона
  const [showPasswordModal, setShowPasswordModal] = useState(false); // Для отображения модалки для смены пароля
  const navigate = useNavigate();

  // Получаем информацию о пользователе после загрузки компонента
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    const decodedToken = jwtDecode(token);
    const username = decodedToken.sub;

    // Запрос для получения информации о пользователе
    axios.get('http://127.0.0.1:8000/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setUserInfo(response.data);  // Устанавливаем информацию о пользователе
      })
      .catch(error => {
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          setIsLoggedIn(false);
          navigate('/login');
        } else {
          notification.error({
            message: 'Ошибка загрузки данных',
            description: error.response?.data?.detail || 'Произошла ошибка',
          });
      }});
  }, [navigate]);

  const toggleChangePassword = () => {
    setShowPasswordModal(!showPasswordModal);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      // Обновление аватара
      axios.patch(
        'http://127.0.0.1:8000/users/update-avatar',
        { avatar_url: info.file.response.url },
        { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
      ).then(response => {
        setUserInfo(prev => ({ ...prev, avatar_url: response.data.avatar_url }));
        notification.success({
          message: 'Аватар обновлен',
        });
      }).catch(error => {
        notification.error({
          message: 'Ошибка обновления аватара',
          description: error.response?.data?.detail || 'Произошла ошибка',
        });
      });
    }
  };

  const handleLogout = () => {
    // Запрос подтверждения перед выходом
    setIsLoggedIn(false);
    localStorage.removeItem('access_token');
    navigate('/login');  // Перенаправление на страницу входа
    notification.success({
      message: 'Вы успешно вышли из аккаунта',
    });
  };

  return (
    <div style={{ position: 'absolute', top: '90px', right: '20px', zIndex: 100 }}>
      <Button 
        type="primary" 
        onClick={showModal}
        style={{ backgroundColor: 'transparent', border: 'none', color: 'black' }}
      >
        {userInfo ? userInfo.username : 'Загрузка...'}
      </Button>

      <Modal 
        title="Информация о пользователе"
        style={{ textAlign: 'center' }}
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={null}
      >
        {userInfo ? (
          <Card
            style={{ width: 300, 'left': '80px' }}
            actions={[
              <SettingOutlined key="setting" onClick={() => setShowUpdateModal(true)} />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" onClick={toggleChangePassword} />,
            ]}
          >
            <Meta
              title={userInfo.username}
              description={userInfo.email}
            />
          </Card>
        ) : (
          <p>Загрузка информации о пользователе...</p>
        )}

        <Space direction="vertical" style={{ width: '100%' }}>
          <br />
          <Popconfirm
            title="Вы уверены, что хотите выйти?"
            onConfirm={handleLogout}
            onCancel={() => {}}
            okText="Да"
            cancelText="Нет"
          >
            <Button 
              className='btn-logout'
              type="primary" 
              block 
              style={{ position: 'absolute', bottom: '10px', right: '10px', width: 'auto', backgroundColor: '#A52A2A' }}
            >
              Выйти из аккаунта
            </Button>
          </Popconfirm>

        </Space>
      </Modal>

      {/* Модальное окно для обновления аватара, фона и пароля */}
      <Modal
        title="Обновить аватар, фон или пароль"
        open={showUpdateModal}
        onCancel={() => { setShowUpdateModal(false); }}
        footer={null}
      >
        {/* Выбор аватара */}
        <Upload
          action="/upload-avatar"
          listType="picture"
          onChange={handleAvatarChange}
          showUploadList={false}
        >
          <Button icon={<EditOutlined />}>Выберите новый аватар</Button>
        </Upload>

        <br />
        <br />
        
        {/* Выбор фона */}
        <Upload
          action="/upload-font"
          listType="picture"
          showUploadList={false}
        >
          <Button icon={<EditOutlined />}>Выберите новый фон</Button>
        </Upload>

        <br />
        <br />

      </Modal>

      {/* Модальное окно для смены пароля */}
      <Modal
        title="Сменить пароль"
        open={showPasswordModal}
        onCancel={() => setShowPasswordModal(false)}
        footer={null}
      >
        <ChangePassword />
      </Modal>
    </div>
  );
};

export default UserInfo;
