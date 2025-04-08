import React, { useEffect, useState } from 'react';
import SupplierList from '../components/SupplierList';
import SupplierForm from '../components/SupplierForm';
import SupplierRatingChart from '../components/SupplierRatingChart';
import { Supplier } from '../types/models';
import api, { deleteSupplier, updateSupplier } from '../services/api';
import { message, Modal, Input } from 'antd';

const SupplierPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [newName, setNewName] = useState('');

  // Lieferanten aus dem Backend abrufen
  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await api.get<Supplier[]>('suppliers/');
      setSuppliers(response.data);
    } catch (error) {
      message.error('Fehler beim Laden der Lieferanten.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Lieferant löschen
  const handleDelete = async (id: number) => {
    try {
      await deleteSupplier(id);
      message.success('Lieferant erfolgreich gelöscht');
      fetchSuppliers();
    } catch (error) {
      message.error('Fehler beim Löschen des Lieferanten');
      console.error(error);
    }
  };

  // Modal zum Bearbeiten öffnen
  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setNewName(supplier.name);
  };

  // Lieferant aktualisieren
  const handleUpdate = async () => {
    if (!editingSupplier) return;

    try {
      await updateSupplier(editingSupplier.id, { name: newName });
      message.success('Lieferant aktualisiert');
      setEditingSupplier(null);
      fetchSuppliers();
    } catch (error) {
      message.error('Fehler beim Aktualisieren');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div style={{ padding: '24px' }}>
      <h2>Lieferantenverwaltung</h2>

      <SupplierForm onCreated={fetchSuppliers} />

      <SupplierList
        suppliers={suppliers}
        loading={loading}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <SupplierRatingChart suppliers={suppliers} />

      {/* Modal zur Bearbeitung eines Lieferanten */}
      <Modal
        open={!!editingSupplier}
        title="Lieferant bearbeiten"
        onCancel={() => setEditingSupplier(null)}
        onOk={handleUpdate}
        okText="Speichern"
        cancelText="Abbrechen"
      >
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Lieferantenname"
        />
      </Modal>
    </div>
  );
};

export default SupplierPage;
