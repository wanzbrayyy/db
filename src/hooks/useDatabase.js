import { useState, useCallback } from 'react';
import { DB } from '../api/db';

export const useDatabase = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ambil semua data
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const result = await DB.find(collectionName);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  // Tambah data baru (ID 50 digit digenerate di DB.insert)
  const create = async (doc) => {
    setLoading(true);
    try {
      const newItem = await DB.insert(collectionName, doc);
      // Update state lokal agar tidak perlu refresh
      setData(prev => [...prev, newItem]); 
      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Hapus data
  const remove = async (id) => {
    // Optimistic Update: Hapus di UI dulu biar terasa cepat
    const oldData = [...data];
    setData(prev => prev.filter(item => item._id !== id));

    try {
      await DB.remove(collectionName, id);
    } catch (err) {
      // Jika gagal, kembalikan data lama
      setData(oldData);
      setError("Gagal menghapus data");
    }
  };

  return {
    data,
    loading,
    error,
    fetchAll,
    create,
    remove
  };
};