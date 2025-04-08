import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EvaluationList from '../components/EvaluationList';
import EvaluationForm from '../components/EvaluationForm';
import CsvUploadForm from '../components/CsvUploadForm'; // Importiere CsvUploadForm
import { SupplierEvaluation, Supplier } from '../types/models';
import {
  getEvaluations,
  getEvaluationsBySupplier,
  deleteEvaluation,
  getSuppliers,
} from '../services/api';
import { message } from 'antd';

const EvaluationsPage: React.FC = () => {
  // Extrahier supplierid aus URL
  const { id } = useParams();
  const supplierId = id ? parseInt(id) : undefined;

  const [evaluations, setEvaluations] = useState<SupplierEvaluation[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [editingEvaluation, setEditingEvaluation] = useState<SupplierEvaluation | null>(null);

  // Bewertungen vom Server laden
  const fetchEvaluations = async (query = '') => {
    setLoading(true);
    try {
      const data = supplierId
        ? await getEvaluationsBySupplier(supplierId, query)
        : await getEvaluations(query);
      setEvaluations(data);
    } catch (err) {
      message.error('Fehler beim Laden der Bewertungen');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Lieferantendaten laden
  const fetchSuppliers = async () => {
    try {
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (err) {
      message.error('Fehler beim Laden der Lieferanten');
      console.error(err);
    }
  };

  // Beim Laden der Seite: sowohl Bewertungen als auch Lieferanten laden
  useEffect(() => {
    fetchSuppliers();
    fetchEvaluations(search);
  }, [supplierId]);

  const handleSearch = (value: string) => {
    setSearch(value);
    fetchEvaluations(value);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEvaluation(id);
      message.success('Bewertung gelöscht');
      fetchEvaluations(search);
    } catch (error) {
      message.error('Fehler beim Löschen');
    }
  };

  // Supplier Name finden, falls die ID vorhanden ist
  const supplierName = suppliers.find((supplier) => supplier.id === supplierId)?.name;

  return (
    <div style={{ padding: '24px' }}>
      <h2>
        {supplierId ? `Bewertungen für ${supplierName || 'Unbekannt'}` : 'Alle Bewertungen'}
      </h2>

      <EvaluationList
        evaluations={evaluations}
        loading={loading}
        search={search}
        onSearch={handleSearch}
        onChangeSearch={setSearch}
        onDelete={handleDelete}
        onEdit={setEditingEvaluation}
      />

      <EvaluationForm
        supplierId={supplierId}
        editingEvaluation={editingEvaluation}
        onCancelEdit={() => setEditingEvaluation(null)}
        onCreated={() => {
          fetchEvaluations(search);
          setEditingEvaluation(null); // Nach dem Speichern zurücksetzen
        }}
      />

      {/* CsvUploadForm nur anzeigen, wenn eine supplierId gesetzt ist */}
      {supplierId && <CsvUploadForm supplierId={supplierId} />}
    </div>
  );
};

export default EvaluationsPage;
