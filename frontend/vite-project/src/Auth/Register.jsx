import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import './background.scss';  // Подключаем стили

const Register = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/auth/register', {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      notification.success({
        message: 'Успешная регистрация',
        description: 'Вы успешно зарегистрировались',
      });
      console.log(response.data);
    } catch (err) {
      notification.error({
        message: 'Ошибка регистрации',
        description: err.response?.data?.detail || 'Произошла ошибка при регистрации',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <Form
        name="register"
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
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Введите email' }]}
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
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
