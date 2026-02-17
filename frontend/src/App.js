import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [view, setView] = useState('home');
  const [competitors, setCompetitors] = useState([]);
  const [status, setStatus] = useState(null);
  const [newCompetitor, setNewCompetitor] = useState({ name: '', url: '', tags: '' });
  const [selectedCompetitor, setSelectedCompetitor] = useState(null);
  const [checks, setChecks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCompetitors();
  }, []);

  const loadCompetitors = async () => {
    try {
      const res = await axios.get(`${API_URL}/competitors`);
      setCompetitors(res.data);
    } catch (error) {
      console.error('Failed to load competitors:', error);
    }
  };

  const loadStatus = async () => {
    try {
      const res = await axios.get(`${API_URL}/status`);
      setStatus(res.data);
    } catch (error) {
      console.error('Failed to load status:', error);
    }
  };

  const addCompetitor = async (e) => {
    e.preventDefault();
    if (!newCompetitor.name || !newCompetitor.url) {
      alert('Name and URL are required');
      return;
    }

    try {
      const tags = newCompetitor.tags.split(',').map(t => t.trim()).filter(t => t);
      await axios.post(`${API_URL}/competitors`, {
        ...newCompetitor,
        tags
      });
      setNewCompetitor({ name: '', url: '', tags: '' });
      loadCompetitors();
    } catch (error) {
      alert('Failed to add competitor: ' + error.message);
    }
  };

  const deleteCompetitor = async (id) => {
    if (!window.confirm('Delete this competitor?')) return;
    try {
      await axios.delete(`${API_URL}/competitors/${id}`);
      loadCompetitors();
    } catch (error) {
      alert('Failed to delete competitor');
    }
  };

  const checkNow = async (id) => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/competitors/${id}/check`);
      alert('Check completed!');
      if (selectedCompetitor?.id === id) {
        loadChecks(id);
      }
    } catch (error) {
      alert('Check failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadChecks = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/competitors/${id}/checks`);
      setChecks(res.data);
    } catch (error) {
      console.error('Failed to load checks:', error);
    }
  };

  const viewHistory = (competitor) => {
    setSelectedCompetitor(competitor);
    loadChecks(competitor.id);
    setView('history');
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h1>🔍 Competitive Intelligence Tracker</h1>
        <div className="nav-links">
          <button onClick={() => setView('home')} className={view === 'home' ? 'active' : ''}>
            Home
          </button>
          <button onClick={() => { setView('status'); loadStatus(); }} className={view === 'status' ? 'active' : ''}>
            Status
          </button>
        </div>
      </nav>

      <div className="container">
        {view === 'home' && (
          <>
            <div className="section">
              <h2>Add Competitor</h2>
              <form onSubmit={addCompetitor} className="form">
                <input
                  type="text"
                  placeholder="Competitor Name"
                  value={newCompetitor.name}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
                />
                <input
                  type="url"
                  placeholder="URL (https://...)"
                  value={newCompetitor.url}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, url: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  value={newCompetitor.tags}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, tags: e.target.value })}
                />
                <button type="submit" className="btn-primary">Add Competitor</button>
              </form>
            </div>

            <div className="section">
              <h2>Competitors ({competitors.length})</h2>
              {competitors.length === 0 ? (
                <p className="empty">No competitors added yet. Add one above to get started!</p>
              ) : (
                <div className="competitors-grid">
                  {competitors.map(comp => (
                    <div key={comp.id} className="competitor-card">
                      <h3>{comp.name}</h3>
                      <a href={comp.url} target="_blank" rel="noopener noreferrer" className="url">
                        {comp.url}
                      </a>
                      {comp.tags && comp.tags.length > 0 && (
                        <div className="tags">
                          {comp.tags.map((tag, i) => (
                            <span key={i} className="tag">{tag}</span>
                          ))}
                        </div>
                      )}
                      <div className="card-actions">
                        <button onClick={() => checkNow(comp.id)} disabled={loading} className="btn-check">
                          {loading ? 'Checking...' : 'Check Now'}
                        </button>
                        <button onClick={() => viewHistory(comp)} className="btn-history">
                          View History
                        </button>
                        <button onClick={() => deleteCompetitor(comp.id)} className="btn-delete">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {view === 'status' && (
          <div className="section">
            <h2>System Status</h2>
            {status ? (
              <div className="status-grid">
                <div className={`status-card ${status.backend === 'healthy' ? 'healthy' : 'unhealthy'}`}>
                  <h3>Backend</h3>
                  <p>{status.backend}</p>
                </div>
                <div className={`status-card ${status.database === 'healthy' ? 'healthy' : 'unhealthy'}`}>
                  <h3>Database</h3>
                  <p>{status.database}</p>
                </div>
                <div className={`status-card ${status.llm === 'healthy' ? 'healthy' : 'unhealthy'}`}>
                  <h3>LLM Connection</h3>
                  <p>{status.llm}</p>
                </div>
              </div>
            ) : (
              <p>Loading status...</p>
            )}
            <p className="timestamp">Last checked: {status?.timestamp}</p>
          </div>
        )}

        {view === 'history' && selectedCompetitor && (
          <div className="section">
            <button onClick={() => setView('home')} className="btn-back">← Back</button>
            <h2>History: {selectedCompetitor.name}</h2>
            <p className="url">{selectedCompetitor.url}</p>
            
            {checks.length === 0 ? (
              <p className="empty">No checks yet. Click "Check Now" to start tracking.</p>
            ) : (
              <div className="checks-list">
                {checks.map(check => (
                  <div key={check.id} className="check-card">
                    <div className="check-header">
                      <span className="check-date">
                        {new Date(check.checked_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="check-summary">
                      <h4>Summary</h4>
                      <p>{check.summary}</p>
                    </div>
                    <div className="check-changes">
                      <h4>Changes</h4>
                      <pre>{check.changes}</pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
