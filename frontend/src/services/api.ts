import axios from 'axios';
import { Supplier, SupplierEvaluation } from '../types/models';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

//Token aus localStorage laden
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});


// Supplier API Calls

export const getSuppliers = async (): Promise<Supplier[]> => {
  const response = await api.get<Supplier[]>('suppliers/');
  return response.data;
};

export const createSupplier = async (supplier: Partial<Supplier>): Promise<Supplier> => {
  const response = await api.post<Supplier>('suppliers/', supplier);
  return response.data;
};

export const updateSupplier = async (id: number, supplier: Partial<Supplier>): Promise<Supplier> => {
  const response = await api.put<Supplier>(`suppliers/${id}/`, supplier);
  return response.data;
};

export const deleteSupplier = async (id: number): Promise<void> => {
  await api.delete(`suppliers/${id}/`);
};


// Evaluation API Calls

export const getEvaluations = async (): Promise<SupplierEvaluation[]> => {
  const response = await api.get<SupplierEvaluation[]>('evaluations/');
  return response.data;
};

export const createEvaluation = async (evaluation: Partial<SupplierEvaluation>): Promise<SupplierEvaluation> => {
  const response = await api.post<SupplierEvaluation>('evaluations/', evaluation);
  return response.data;
};

export const updateEvaluation = async (id: number, evaluation: Partial<SupplierEvaluation>): Promise<SupplierEvaluation> => {
  const response = await api.put<SupplierEvaluation>(`evaluations/${id}/`, evaluation);
  return response.data;
};

export const deleteEvaluation = async (id: number): Promise<void> => {
  await api.delete(`evaluations/${id}/`);
};

export default api;
