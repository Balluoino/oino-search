import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchWines = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://your-backend-url.com/api/weine?q=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Fehler bei der Suchanfrage:', error);
      setError('Fehler beim Laden der Weindaten. Bitte versuche es später erneut.');
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Oino-Search 🍷</h1>
      <div className="search-container">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Weinname eingeben..." />
        <button onClick={searchWines} disabled={loading}>{loading ? '🔍 Suche läuft...' : 'Wein suchen'}</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="results-container">
        {results.map((wine, index) => (
          <div key={index} className="wine-card">
            <h3>{wine.name}</h3>
            <p><strong>Jahrgang:</strong> {wine.jahrgang || 'N/A'}</p>
            <p><strong>Preis:</strong> {wine.preis || 'Nicht verfügbar'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
