const API_URL = 'https://dbw-nu.vercel.app/api/schema';

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

export const SchemaAPI = {
  getSchema: async (collectionName) => {
    const res = await fetch(`${API_URL}/${collectionName}`, { headers: getHeaders() });
    return await handleResponse(res);
  },
  
  saveSchema: async (collectionName, fields) => {
    const res = await fetch(`${API_URL}/${collectionName}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ fields })
    });
    return await handleResponse(res);
  },
};