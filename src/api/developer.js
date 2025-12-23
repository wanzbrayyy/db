const API_URL = 'https://dbw-nu.vercel.app/api/developer';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'x-auth-token': localStorage.getItem('token')
});

const handleResponse = async (res) => {
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message || "Request Failed");
    return data;
  } else {
    const text = await res.text();
    if (!res.ok) throw new Error(text || `Server Error ${res.status}`);
    return text;
  }
};

export const DevAPI = {
  // --- API KEYS ---
  getKeys: async () => {
    const res = await fetch(`${API_URL}/keys`, { headers: getHeaders() });
    return await handleResponse(res);
  },
  createKey: async (name, permissions) => {
    const res = await fetch(`${API_URL}/keys`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ name, permissions })
    });
    return await handleResponse(res);
  },
  deleteKey: async (id) => {
    const res = await fetch(`${API_URL}/keys/${id}`, { method: 'DELETE', headers: getHeaders() });
    return await handleResponse(res);
  },
  
  // --- WEBHOOKS ---
  getWebhooks: async () => {
    const res = await fetch(`${API_URL}/webhooks`, { headers: getHeaders() });
    return await handleResponse(res);
  },
  createWebhook: async (url, events) => {
    const res = await fetch(`${API_URL}/webhooks`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ url, events })
    });
    return await handleResponse(res);
  },
  testWebhook: async (url) => {
    // Simulasi ping/test ke URL eksternal
    const res = await fetch(`https://dbw-nu.vercel.app/api/developer/webhook-test`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ url })
    });
    return await handleResponse(res);
  },

  // --- LOGS & STATS ---
  getLogs: async () => {
    const res = await fetch(`${API_URL}/logs`, { headers: getHeaders() });
    return await handleResponse(res);
  },
  getStats: async () => {
    const res = await fetch(`${API_URL}/stats`, { headers: getHeaders() });
    return await handleResponse(res);
  }
};