import { generateNanoId } from '../utils/uuid';

const API_URL = 'https://dbw-nu.vercel.app/api/data';

// Helper delay (Optional, hanya untuk efek visual loading di UI)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const DB = {
  // --- Collection Management ---
  
  getCollections: async () => {
    // await delay(200); // Uncomment jika ingin efek loading buatan
    const res = await fetch(`${API_URL}/collections`);
    return await res.json();
  },

  createCollection: async (name) => {
    // await delay(300);
    const res = await fetch(`${API_URL}/collections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create");
    }
    return await res.json();
  },

  deleteCollection: async (name) => {
    // await delay(300);
    await fetch(`${API_URL}/collections/${name}`, { method: 'DELETE' });
    return true;
  },

  // --- Document CRUD ---
  
  // 1. Find All
  find: async (collection) => {
    // await delay(100);
    const res = await fetch(`${API_URL}/${collection}`);
    return await res.json();
  },

  // 2. Find One (Diperbarui untuk API)
  // predicate sekarang harus OBJECT, contoh: { email: "budi@gmail.com" }
  findOne: async (collection, predicate) => {
    // await delay(200);
    
    // Jika predicate masih berupa function (sisa kode lama), kita harus error
    if (typeof predicate === 'function') {
      console.error("ERROR: DB.findOne now requires an Object, not a function.");
      throw new Error("DB Update: Please pass an object to findOne (e.g., { email: val })");
    }

    const res = await fetch(`${API_URL}/${collection}/find-one`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(predicate)
    });
    
    return await res.json();
  },

  // 3. Find By ID
  findById: async (collection, id) => {
    // await delay(100);
    const res = await fetch(`${API_URL}/${collection}/${id}`);
    const data = await res.json();
    return data || null;
  },

  // 4. Insert (Generate ID di frontend, kirim ke backend)
  insert: async (collection, data) => {
    // await delay(200);
    
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

    if (!res.ok) throw new Error("Failed to insert");
    return await res.json();
  },

  // 5. Update
  update: async (collection, id, updates) => {
    // await delay(200);
    const res = await fetch(`${API_URL}/${collection}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return await res.json();
  },

  // 6. Remove
  remove: async (collection, id) => {
    // await delay(200);
    await fetch(`${API_URL}/${collection}/${id}`, { method: 'DELETE' });
    return true;
  }
};