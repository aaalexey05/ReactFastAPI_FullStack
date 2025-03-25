import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  // Обработка отправки формы
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/auth/change-password', {
        username: localStorage.getItem('username'), // Получаем имя пользователя из localStorage
        old_password: values.oldPassword,
        new_password: values.newPassword,
      });
      notification.success({
        message: 'Пароль успешно изменен',
      });
      console.log(response.data);
    } catch (error) {
      notification.error({
        message: 'Ошибка смены пароля',
        description: error.response?.data?.detail || 'Произошла ошибка на сервере',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <Form
        name="change-password"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Старый пароль"
          name="oldPassword"
          rules={[{ required: true, message: 'Введите старый пароль!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Новый пароль"
          name="newPassword"
          rules={[{ required: true, message: 'Введите новый пароль!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Подтвердите новый пароль"
          name="confirmPassword"
          rules={[
            { required: true, message: 'Подтвердите новый пароль!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Изменить пароль
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
