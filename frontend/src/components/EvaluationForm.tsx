import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, DatePicker, Select, message } from 'antd';
import { createEvaluation, getSuppliers, updateEvaluation } from '../services/api';
import { Supplier, SupplierEvaluation } from '../types/models';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface Props {
  onCreated?: () => void;
  supplierId?: number;
  editingEvaluation?: SupplierEvaluation | null;
  onCancelEdit?: () => void;
}

const EvaluationForm: React.FC<Props> = ({
  onCreated,
  supplierId,
  editingEvaluation,
  onCancelEdit,
}) => {
  const [form] = Form.useForm();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSuppliers()
      .then(setSuppliers)
      .catch((err) => {
        message.error('Lieferanten konnten nicht geladen werden');
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // Wenn eine Bewertung bearbeitet wird, Formularfelder vorbelegen
    if (editingEvaluation) {
      form.setFieldsValue({
        supplier: editingEvaluation.supplier.id,
        evaluation_score: editingEvaluation.evaluation_score,
        evaluation_date: dayjs(editingEvaluation.evaluation_date),
        comments: editingEvaluation.comments,
      });
    } else {
      form.resetFields();
    }
  }, [editingEvaluation]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        evaluation_score: values.evaluation_score,
        evaluation_date: values.evaluation_date.format('YYYY-MM-DD'),
        comments: values.comments,
        supplier_id: supplierId ?? values.supplier,
      };

      if (editingEvaluation) {
        await updateEvaluation(editingEvaluation.id, payload);
        message.success('Bewertung aktualisiert');
      } else {
        await createEvaluation(payload);
        message.success('Bewertung erfolgreich erstellt');
      }

      form.resetFields();
      onCreated?.();
    } catch (error) {
      message.error('Fehler beim Speichern der Bewertung');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600, marginTop: '2rem' }}
    >
      {!supplierId && (
        <Form.Item
          label="Lieferant"
          name="supplier"
          rules={[{ required: true, message: 'Bitte einen Lieferanten auswählen' }]}
        >
          <Select placeholder="Lieferant auswählen">
            {suppliers.map((s) => (
              <Option key={s.id} value={s.id}>
                {s.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}

      <Form.Item
        label="Bewertung (1–100)"
        name="evaluation_score"
        rules={[{ required: true, message: 'Bitte eine Bewertung angeben' }]}
      >
        <InputNumber min={1} max={100} />
      </Form.Item>

      <Form.Item
        label="Datum"
        name="evaluation_date"
        rules={[{ required: true, message: 'Bitte ein Datum wählen' }]}
        initialValue={dayjs()}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item 
        label="Kommentar" 
        name="comments"
        rules={[{ required: true, message: 'Bitte einen Kommentar ausgeben' }]}>
        <TextArea rows={3} placeholder="Kommentar..." />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {editingEvaluation ? 'Bewertung aktualisieren' : 'Bewertung speichern'}
        </Button>
        {editingEvaluation && (
          <Button
            style={{ marginLeft: '1rem' }}
            onClick={() => {
              form.resetFields();
              onCancelEdit?.();
            }}
          >
            Bearbeiten abbrechen
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default EvaluationForm;
