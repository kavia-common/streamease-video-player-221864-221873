import React, { createContext } from 'react';

export const initialPlayerState = {
  active: null,
  mini: {
    open: false,
    video: null,
    currentTime: 0,
    srcIndex: 0,
    autoplay: true,
  },
};

export function playerReducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE':
      return { ...state, active: action.payload };
    case 'OPEN_MINI': {
      const { video, currentTime = 0, srcIndex = 0 } = action.payload || {};
      return {
        ...state,
        mini: { ...state.mini, open: true, video, currentTime, srcIndex, autoplay: true },
      };
    }
    case 'CLOSE_MINI':
      return { ...state, mini: { ...state.mini, open: false, video: null } };
    default:
      return state;
  }
}

export const PlayerContext = createContext({
  playerState: initialPlayerState,
  playerDispatch: () => {},
});
