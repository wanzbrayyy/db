import { generateNanoId } from '../utils/uuid';

// Simulasi delay network (biar terasa seperti fetch API beneran)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper untuk LocalStorage
const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const DB = {
  // --- Generic CRUD ---
  
  // Find All
  find: async (collection) => {
    await delay(300);
    return getStorage(collection);
  },

  // Find One by ID
  findById: async (collection, id) => {
    await delay(300);
    const items = getStorage(collection);
    return items.find(item => item._id === id) || null;
  },

  // Find One by Query (misal: cari user by email)
  findOne: async (collection, predicate) => {
    await delay(300);
    const items = getStorage(collection);
    return items.find(predicate) || null;
  },

  // Insert (Auto ID 50 Digit)
  insert: async (collection, data) => {
    await delay(500);
    const items = getStorage(collection);
    
    const newItem = {
      _id: generateNanoId(50), // 🔥 ID 50 DIGIT
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    };

    items.push(newItem);
    setStorage(collection, items);
    return newItem;
  },

  // Update
  update: async (collection, id, updates) => {
    await delay(400);
    let items = getStorage(collection);
    const index = items.findIndex(item => item._id === id);
    
    if (index === -1) throw new Error("Document not found");

    items[index] = { 
      ...items[index], 
      ...updates, 
      updatedAt: new Date().toISOString() 
    };

    setStorage(collection, items);
    return items[index];
  },

  // Delete
  remove: async (collection, id) => {
    await delay(400);
    let items = getStorage(collection);
    const newItems = items.filter(item => item._id !== id);
    setStorage(collection, newItems);
    return true;
  }
};