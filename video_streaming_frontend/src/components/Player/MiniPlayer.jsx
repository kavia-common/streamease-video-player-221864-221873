import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { PlayerContext } from '../../state/playerSlice';
import { UIContext } from '../../state/uiSlice';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function MiniPlayer() {
  /**
   * Sticky bottom-right mini player that remains across navigation.
   * Provides expand (to watch page), play/pause, and close.
   */
  const root = document.getElementById('mini-player-root');
  const { playerState, playerDispatch } = useContext(PlayerContext);
  const { features } = useContext(UIContext);
  const nav = useNavigate();
  const vRef = useRef(null);

  const open = playerState.mini.open && features.MINI_PLAYER;
  const video = playerState.mini.video;
  const sources = useMemo(() => video?.sources || [], [video]);

  useEffect(() => {
    if (!open || !vRef.current) return;
    if (playerState.mini.currentTime) {
      vRef.current.currentTime = playerState.mini.currentTime;
    }
    if (playerState.mini.autoplay) {
      vRef.current.play().catch(() => {});
    }
  }, [open, playerState.mini.currentTime, playerState.mini.autoplay]);

  if (!root || !open || !video) return null;

  function onClose() {
    playerDispatch({ type: 'CLOSE_MINI' });
  }

  function onExpand() {
    playerDispatch({ type: 'CLOSE_MINI' });
    nav(`/watch/${video.id}`);
  }

  return createPortal(
    <div className="mini-player" role="dialog" aria-label="Mini player">
      <video ref={vRef} controls playsInline poster={video.thumbnail} style={{ width: '100%', height: 'auto' }}>
        {sources[playerState.mini.srcIndex] ? (
          <source src={sources[playerState.mini.srcIndex]} type="video/mp4" />
        ) : null}
      </video>
      <div className="mini-bar">
        <button className="btn" onClick={onExpand} aria-label="Expand">Expand</button>
        <button className="btn" onClick={onClose} aria-label="Close mini player">Close</button>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-secondary)' }}>{video.title}</div>
      </div>
    </div>,
    root
  );
}
