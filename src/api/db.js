import { generateNanoId } from '../utils/uuid';

// 🔥 URL Backend Vercel Anda
const API_URL = 'https://dbw-nu.vercel.app/api/data';

// Helper: Menangani respon API agar tidak crash saat menerima "Server error" (Text)
const handleResponse = async (res) => {
  const contentType = res.headers.get("content-type");
  
  // 1. Jika server membalas dengan JSON
  if (contentType && contentType.includes("application/json")) {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.message || data.msg || "API Request Failed");
    }
    return data;
  } 
  
  // 2. Jika server membalas dengan Text (Misal: "Server error")
  else {
    const text = await res.text();
    if (!res.ok) {
      throw new Error(text || `HTTP Error ${res.status}`);
    }
    return text; // Jarang terjadi untuk endpoint data, tapi aman.
  }
};

export const DB = {
  // --- Collection Management ---

  getCollections: async () => {
    try {
      const res = await fetch(`${API_URL}/collections`);
      
      // Gunakan handler pintar kita
      const data = await handleResponse(res);
      
      // VALIDASI EKSTRA: Pastikan data adalah Array agar tidak error "map is not a function"
      if (!Array.isArray(data)) {
        console.warn("Warning: API did not return an array for collections.", data);
        return []; 
      }
      return data;
    } catch (error) {
      console.error("DB GetCollections Error:", error);
      return []; // Return array kosong agar Dashboard tidak Blank putih
    }
  },

  createCollection: async (name) => {
    // Validasi input di awal
    if (!name) throw new Error("Collection name is required");

    const res = await fetch(`${API_URL}/collections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    
    // Ini yang memperbaiki error "Unexpected token S"
    return await handleResponse(res);
  },

  deleteCollection: async (name) => {
    const res = await fetch(`${API_URL}/collections/${name}`, { 
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    
    return await handleResponse(res);
  },

  // --- Document CRUD ---

  find: async (collection) => {
    try {
      const res = await fetch(`${API_URL}/${collection}`);
      
      // Cek status 404 (Collection belum dibuat) -> Return kosong
      if (res.status === 404) return [];
      
      const data = await handleResponse(res);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(`Find Error in ${collection}:`, error);
      return [];
    }
  },

  findOne: async (collection, predicate) => {
    if (typeof predicate === 'function') {
      console.error("Deprecated: DB.findOne requires Object predicate.");
      throw new Error("Invalid predicate. Use object format: { key: value }");
    }

    const res = await fetch(`${API_URL}/${collection}/find-one`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(predicate)
    });

    // Handle null result gracefully
    if (res.status === 404) return null;
    
    // Jika body kosong (null), jangan parse JSON
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  },

  findById: async (collection, id) => {
    const res = await fetch(`${API_URL}/${collection}/${id}`);
    if (res.status === 404) return null;
    return await handleResponse(res);
  },

  insert: async (collection, data) => {
    // Generate ID 50 Digit di Frontend agar UI konsisten
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

    return await handleResponse(res);
  },

  update: async (collection, id, updates) => {
    const res = await fetch(`${API_URL}/${collection}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });

    return await handleResponse(res);
  },

  remove: async (collection, id) => {
    const res = await fetch(`${API_URL}/${collection}/${id}`, { 
      method: 'DELETE' 
    });

    return await handleResponse(res);
  }
};