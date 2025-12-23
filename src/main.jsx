import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* TAMBAHKAN FALLBACK BACKGROUND COLOR DI ROOT ELEMENT */}
    <div className="bg-[#09090b] min-h-screen"> 
      <App />
    </div>
  </React.StrictMode>,
);