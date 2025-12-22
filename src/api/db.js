import { generateNanoId } from '../utils/uuid';

// 🔥 URL Backend Vercel Anda
const API_URL = 'https://dbw-nu.vercel.app/api/data';

// Helper delay (Opsional, untuk efek loading visual di UI)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const DB = {
  // --- Collection Management ---

  getCollections: async () => {
    try {
      const res = await fetch(`${API_URL}/collections`);
      if (!res.ok) throw new Error("Failed to fetch collections");
      
      const data = await res.json();
      
      // FIX: Validasi agar selalu mengembalikan array
      // Jika backend error atau null, kembalikan array kosong agar UI tidak crash
      if (!Array.isArray(data)) {
        console.warn("API response is not an array:", data);
        return []; 
      }
      return data;
    } catch (error) {
      console.error("DB Error:", error);
      return []; // Safety fallback
    }
  },

  createCollection: async (name) => {
    // Validasi input
    if (!name) throw new Error("Collection name is required");

    const res = await fetch(`${API_URL}/collections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    
    const data = await res.json();

    if (!res.ok) {
      // Menangkap pesan error spesifik dari backend
      throw new Error(data.error || data.message || "Failed to create collection");
    }
    
    return data;
  },

  deleteCollection: async (name) => {
    const res = await fetch(`${API_URL}/collections/${name}`, { 
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!res.ok) throw new Error("Failed to delete collection");
    return true;
  },

  // --- Document CRUD ---

  find: async (collection) => {
    try {
      const res = await fetch(`${API_URL}/${collection}`);
      if (!res.ok) {
        if (res.status === 404) return []; // Jika collection belum ada
        throw new Error("Failed to fetch documents");
      }
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(`Find Error in ${collection}:`, error);
      return [];
    }
  },

  // Perbaikan: findOne sekarang menerima Object, bukan Function
  findOne: async (collection, predicate) => {
    // Safety check untuk kode lama
    if (typeof predicate === 'function') {
      console.error("Deprecated: DB.findOne now requires an Object (e.g., { email: '...' })");
      throw new Error("Client Error: Invalid predicate format. Use object.");
    }

    const res = await fetch(`${API_URL}/${collection}/find-one`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(predicate)
    });

    if (!res.ok) return null; // Return null jika tidak ketemu
    return await res.json();
  },

  findById: async (collection, id) => {
    const res = await fetch(`${API_URL}/${collection}/${id}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data || null;
  },

  insert: async (collection, data) => {
    // Generate ID 50 Digit di Frontend
    const newItem = {
      _id: generateNanoId(50), 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    };

    const res = await fetch(`${API_URL}/${collection}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to insert document");
    }
    return await res.json();
  },

  update: async (collection, id, updates) => {
    const res = await fetch(`${API_URL}/${collection}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });

    if (!res.ok) throw new Error("Failed to update document");
    return await res.json();
  },

  remove: async (collection, id) => {
    const res = await fetch(`${API_URL}/${collection}/${id}`, { 
      method: 'DELETE' 
    });

    if (!res.ok) throw new Error("Failed to delete document");
    return true;
  }
};