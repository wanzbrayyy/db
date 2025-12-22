import { generateNanoId } from '../utils/uuid';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Key khusus untuk menyimpan daftar nama collection
const META_COLLECTIONS_KEY = '_meta_collections_list';

export const DB = {
  // --- Collection Management ---
  getCollections: async () => {
    await delay(200);
    const defaults = [
      { name: 'users', type: 'system' }, 
      { name: 'logs', type: 'system' }
    ];
    const stored = getStorage(META_COLLECTIONS_KEY);
    return stored.length > 0 ? stored : defaults;
  },

  createCollection: async (name) => {
    await delay(300);
    const collections = await DB.getCollections();
    
    if (collections.find(c => c.name === name)) {
      throw new Error(`Collection '${name}' already exists.`);
    }

    const newCol = { 
      name, 
      type: 'user', 
      createdAt: new Date().toISOString(),
      docsCount: 0 
    };
    
    collections.push(newCol);
    setStorage(META_COLLECTIONS_KEY, collections);
    return newCol;
  },

  deleteCollection: async (name) => {
    await delay(300);
    let collections = await DB.getCollections();
    collections = collections.filter(c => c.name !== name);
    setStorage(META_COLLECTIONS_KEY, collections);
    localStorage.removeItem(name);
    return true;
  },

  // --- Document CRUD (YANG HILANG KEMARIN) ---
  
  // 1. Find All
  find: async (collection) => {
    await delay(100);
    return getStorage(collection);
  },

  // 2. Find One (Wajib untuk Login)
  findOne: async (collection, predicate) => {
    await delay(200);
    const items = getStorage(collection);
    return items.find(predicate) || null;
  },

  // 3. Find By ID (Wajib untuk Detail)
  findById: async (collection, id) => {
    await delay(100);
    const items = getStorage(collection);
    return items.find(item => item._id === id) || null;
  },

  // 4. Insert
  insert: async (collection, data) => {
    await delay(200);
    const items = getStorage(collection);
    
    const newItem = {
      _id: generateNanoId(50), 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    };

    items.unshift(newItem);
    setStorage(collection, items);
    return newItem;
  },

  // 5. Update (Wajib untuk Edit Profile)
  update: async (collection, id, updates) => {
    await delay(200);
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

  // 6. Remove
  remove: async (collection, id) => {
    await delay(200);
    let items = getStorage(collection);
    const newItems = items.filter(item => item._id !== id);
    setStorage(collection, newItems);
    return true;
  }
};