import api from '../utils/api';
import { UpdateBoardData } from '../types/board';

export const fetchBoards = async () => {
  const response = await api.get('/boards');
  return response.data;
};

export const createBoard = async (data: { name: string }) => {
  const response = await api.post('/boards', data);
  return response.data;
};

export const fetchBoardById = async (id: string) => {
  const response = await api.get(`/boards/${id}`);
  return response.data;
};

export const updateBoard = async (id: string, data: UpdateBoardData) => {
  const response = await api.put(`/boards/${id}`, data);
  return response.data;
};

export const deleteBoard = async (id: string) => {
  const response = await api.delete(`/boards/${id}`);
  return response.data;
};