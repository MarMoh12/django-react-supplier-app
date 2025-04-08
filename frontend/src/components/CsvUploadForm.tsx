import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../services/api';
import Papa from 'papaparse';  // CSV Parser
import { UploadFile } from 'antd/es/upload/interface';

// Definiere die Struktur der CSV-Daten
interface EvaluationData {
  evaluation_score: number;
  evaluation_comment: string;
}

interface CsvUploadFormProps {
  supplierId: number;
}

const CsvUploadForm: React.FC<CsvUploadFormProps> = ({ supplierId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (file: File) => {
    setFile(file);
  };

  const handleFileUpload = async () => {
    if (!file) {
      message.error('Bitte eine Datei auswählen.');
      return;
    }

    setLoading(true);

    // CSV-Datei parsen
    Papa.parse(file, {
      complete: async (result: { data: EvaluationData[] }) => {
        const evaluations = result.data;
        for (const evaluation of evaluations) {
          try {
            // Bewertung erstellen
            const payload = {
              supplier_id: supplierId, // Verwende die übergebene supplierId
              evaluation_score: evaluation.evaluation_score,
              evaluation_date: new Date().toISOString().split('T')[0], // Aktuelles Datum
              comments: evaluation.evaluation_comment,
            };

            await api.post('/evaluations/', payload);
            message.success('Bewertungen erfolgreich hochgeladen!');
          } catch (error) {
            message.error('Fehler beim Verarbeiten der Datei.');
            console.error(error);
          }
        }
        setLoading(false);
      },
      header: true, // Damit die erste Zeile als Header behandelt wird
      skipEmptyLines: true, // Leere Zeilen überspringen
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Upload
        beforeUpload={(file) => {
          handleFileChange(file);
          return false; // Verhindert den sofortigen Upload
        }}
        fileList={file ? [{ uid: file.name, name: file.name, status: 'done', url: URL.createObjectURL(file) }] : []}
      >
        <Button icon={<UploadOutlined />}>CSV-Datei auswählen</Button>
      </Upload>

      {file && (
        <Button
          style={{ marginTop: '1rem' }}
          type="primary"
          onClick={handleFileUpload}
          loading={loading}
        >
          Datei hochladen
        </Button>
      )}
    </div>
  );
};

export default CsvUploadForm;
