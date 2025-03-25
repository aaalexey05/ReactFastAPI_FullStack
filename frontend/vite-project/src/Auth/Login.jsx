import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import './background.scss';  // Подключаем стили
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login', {
        username: values.username,
        password: values.password,
      });
      localStorage.setItem("access_token", response.data.access_token);
      notification.success({
        message: 'Успешный вход',
      });
      setIsLoggedIn(true);
      navigate('/user-info');  // Перенаправляем пользователя на страницу UserInfo
    } catch (error) {
      notification.error({
        message: 'Ошибка входа',
        description: error.response?.data?.detail || 'Произошла ошибка на сервере',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <Form
        name="login"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[{ required: true, message: 'Введите имя пользователя' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
