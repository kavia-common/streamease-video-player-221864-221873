import React, { createContext } from 'react';

const persistedAutoplay = (() => {
  const stored = localStorage.getItem('se.autoplay');
  return stored === null ? true : stored === 'true';
})();

const persistedTheme = (() => {
  const stored = localStorage.getItem('se.theme');
  return stored || 'light';
})();

export const initialUIState = {
  theme: persistedTheme,
  autoplay: persistedAutoplay,
};

export function uiReducer(state, action) {
  switch (action.type) {
    case 'SET_THEME': {
      const theme = action.payload;
      localStorage.setItem('se.theme', theme);
      return { ...state, theme };
    }
    case 'SET_AUTOPLAY': {
      const autoplay = !!action.payload;
      localStorage.setItem('se.autoplay', String(autoplay));
      return { ...state, autoplay };
    }
    default:
      return state;
  }
}

export const UIContext = createContext({
  uiState: initialUIState,
  uiDispatch: () => {},
  features: { PIP: true, MINI_PLAYER: true, AUTOPLAY: true, KEYBOARD: true },
});
