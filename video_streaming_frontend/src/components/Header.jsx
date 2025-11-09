import React, { useContext, useMemo, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UIContext } from '../state/uiSlice';
import logo from '../assets/logo.svg';

// PUBLIC_INTERFACE
export default function Header() {
  /** Top navigation with logo, search, and actions */
  const { uiState, uiDispatch } = useContext(UIContext);
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const searchQuery = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('q') || '';
  }, [location.search]);

  React.useEffect(() => setQ(searchQuery), [searchQuery]);

  function onSubmit(e) {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  function toggleTheme() {
    uiDispatch({ type: 'SET_THEME', payload: uiState.theme === 'light' ? 'dark' : 'light' });
  }

  return (
    <header className="header" role="banner">
      <Link to="/" className="logo" aria-label="StreamEase Home">
        <img src={logo} alt="" width="28" height="28" />
        <span>StreamEase</span>
      </Link>

      <form onSubmit={onSubmit} className="search" role="search" aria-label="Site Search">
        <input
          type="search"
          placeholder="Search videos"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search videos"
        />
        <button type="submit" className="btn" aria-label="Search">
          🔍
        </button>
      </form>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button className="btn" onClick={toggleTheme} aria-label="Toggle theme">
          {uiState.theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
}
