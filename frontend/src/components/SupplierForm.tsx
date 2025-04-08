import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import api from '../services/api';

interface Props {
  onCreated?: () => void;
}

const SupplierForm: React.FC<Props> = ({ onCreated }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { name: string }) => {
    setLoading(true);
    try {
      await api.post('suppliers/', values);
      message.success('Lieferant erfolgreich erstellt');
      onCreated?.(); // aktualisiert z. B. die Liste der Lieferanten
    } catch (error) {
      message.error('Fehler beim Erstellen des Lieferanten');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 400, marginBottom: '2rem' }}
    >
      <Form.Item
        label="Lieferantenname"
        name="name"
        rules={[{ required: true, message: 'Bitte einen Namen eingeben' }]}
      >
        <Input placeholder="z. B. Muster GmbH" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Lieferant hinzufügen
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SupplierForm;
