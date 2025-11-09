import React, { useEffect, useMemo, useReducer } from 'react';
import './App.css';
import RoutesRoot from './router/Routes';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MiniPlayer from './components/Player/MiniPlayer';
import { playerReducer, initialPlayerState, PlayerContext } from './state/playerSlice';
import { uiReducer, initialUIState, UIContext } from './state/uiSlice';
import { getFeatureFlag, getInitialTheme } from './utils/env';

// PUBLIC_INTERFACE
export default function App() {
  /**
   * Application shell with header, sidebar, routed main content,
   * global contexts for player and UI, and MiniPlayer portal root.
   */
  const [playerState, playerDispatch] = useReducer(playerReducer, initialPlayerState);
  const [uiState, uiDispatch] = useReducer(uiReducer, initialUIState);

  // Apply theme attribute on load and when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', uiState.theme);
  }, [uiState.theme]);

  // Feature flags (default enabled)
  const features = useMemo(
    () => ({
      PIP: getFeatureFlag('PIP', true),
      MINI_PLAYER: getFeatureFlag('MINI_PLAYER', true),
      AUTOPLAY: getFeatureFlag('AUTOPLAY', true),
      KEYBOARD: getFeatureFlag('KEYBOARD', true),
    }),
    []
  );

  // initialize theme from env/localStorage on first render
  useEffect(() => {
    const initialTheme = getInitialTheme();
    if (initialTheme && initialTheme !== uiState.theme) {
      uiDispatch({ type: 'SET_THEME', payload: initialTheme });
    }
  }, []); // eslint-disable-line

  return (
    <UIContext.Provider value={{ uiState, uiDispatch, features }}>
      <PlayerContext.Provider value={{ playerState, playerDispatch }}>
        <div className="app-shell">
          <Header />
          <div className="layout">
            <Sidebar />
            <main className="content" role="main">
              <RoutesRoot />
            </main>
          </div>
          <div id="mini-player-root" aria-live="polite" />
          <MiniPlayer />
        </div>
      </PlayerContext.Provider>
    </UIContext.Provider>
  );
}
