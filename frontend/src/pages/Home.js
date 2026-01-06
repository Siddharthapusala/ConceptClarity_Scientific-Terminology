import { useState } from 'react';
import { api } from '../services/api';
import './Home.css';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setError('Please enter a scientific term to search');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const res = await api.get(`/search?q=${encodeURIComponent(searchTerm)}`);
      setResult(res.data.definition || res.data.message);
    } catch (err) {
      setError('Failed to fetch definition. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const popularTerms = [
    'Photosynthesis',
    'Quantum Physics',
    'DNA Replication',
    'Black Hole',
    'Climate Change',
    'Artificial Intelligence'
  ];

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-icon">🧠</span>
            ConceptClarity
          </h1>
          <p className="hero-subtitle">
            Unlock the mysteries of science with clear, concise explanations
          </p>
          
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-container">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a scientific concept..."
                className="search-input"
              />
              <button type="submit" disabled={loading} className="search-button">
                {loading ? '🔍' : 'Search'}
              </button>
            </div>
          </form>

          {error && <div className="error-message">{error}</div>}
        </div>
      </div>

      {result && (
        <div className="result-section">
          <div className="result-card">
            <div className="result-header">
              <h2>{searchTerm}</h2>
            </div>
            <div className="result-content">
              <p>{result}</p>
            </div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <div className="popular-section">
          <h3 className="popular-title">Popular Scientific Concepts</h3>
          <div className="popular-grid">
            {popularTerms.map((term) => (
              <button
                key={term}
                onClick={() => setSearchTerm(term)}
                className="popular-card"
              >
                <div className="popular-icon">🔬</div>
                <span>{term}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="features-section">
        <h3 className="features-title">Why Choose ConceptClarity?</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h4>Accurate Definitions</h4>
            <p>Get precise and reliable scientific explanations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h4>Instant Results</h4>
            <p>Quick access to scientific knowledge</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h4>Comprehensive Coverage</h4>
            <p>Wide range of scientific disciplines</p>
          </div>
        </div>
      </div>
    </div>
  );
}