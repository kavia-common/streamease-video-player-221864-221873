import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { PlayerContext } from '../../state/playerSlice';
import { UIContext } from '../../state/uiSlice';

// PUBLIC_INTERFACE
export default function VideoPlayer({ video, upNext, onEndedAutoplay }) {
  /**
   * HTML5 video player with:
   * - multiple source fallback rotation on error
   * - PiP, Fullscreen, Mute, Mini-player trigger
   * - Keyboard shortcuts (space, m, f, p)
   * - Volume and autoplay persistence
   */
  const videoRef = useRef(null);
  const { playerDispatch } = useContext(PlayerContext);
  const { uiState, features } = useContext(UIContext);
  const [srcIndex, setSrcIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [autoplay, setAutoplay] = useState(uiState.autoplay);

  const sources = useMemo(() => video?.sources || [], [video]);

  // Load volume/autoplay from localStorage
  useEffect(() => {
    const vol = Number(localStorage.getItem('se.volume'));
    if (!Number.isNaN(vol) && videoRef.current) {
      videoRef.current.volume = Math.min(1, Math.max(0, vol));
    }
  }, []);
  useEffect(() => setAutoplay(uiState.autoplay), [uiState.autoplay]);

  useEffect(() => {
    if (!videoRef.current) return;
    playerDispatch({ type: 'SET_ACTIVE', payload: video });
  }, [video, playerDispatch]);

  function onError() {
    if (srcIndex < sources.length - 1) {
      setSrcIndex((i) => i + 1);
    }
  }

  function onLoadedMetadata() {
    if (autoplay) {
      videoRef.current?.play().catch(() => {});
    }
  }

  async function togglePiP() {
    if (!features.PIP) return;
    const el = videoRef.current;
    if (!el) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled && el.requestPictureInPicture) {
        await el.requestPictureInPicture();
      }
    } catch {
      // gracefully ignore
    }
  }

  function toggleFullscreen() {
    const el = videoRef.current?.parentElement;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  function toggleMute() {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  }

  function onVolume(e) {
    const el = videoRef.current;
    if (!el) return;
    const v = Number(e.target.value);
    el.volume = v;
    localStorage.setItem('se.volume', String(v));
  }

  function onAutoplayToggle() {
    const next = !autoplay;
    setAutoplay(next);
    localStorage.setItem('se.autoplay', String(next));
  }

  function onEnded() {
    if (features.AUTOPLAY && autoplay && upNext?.length) {
      onEndedAutoplay?.(upNext[0]);
    }
  }

  // Keyboard controls
  useEffect(() => {
    if (!features.KEYBOARD) return;
    function onKey(e) {
      const el = videoRef.current;
      if (!el) return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (el.paused) el.play().catch(() => {});
        else el.pause();
      } else if (e.key.toLowerCase() === 'm') {
        toggleMute();
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'p') {
        togglePiP();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [features.KEYBOARD]); // eslint-disable-line

  // Mini player trigger
  function openMini() {
    if (!features.MINI_PLAYER) return;
    playerDispatch({ type: 'OPEN_MINI', payload: { video, currentTime: videoRef.current?.currentTime || 0, srcIndex } });
  }

  if (!video) return null;

  return (
    <div>
      <div className="player">
        <video
          ref={videoRef}
          controls
          playsInline
          onError={onError}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={onEnded}
          style={{ width: '100%', height: 'auto', background: '#000' }}
          poster={video.thumbnail}
        >
          {sources[srcIndex] ? <source src={sources[srcIndex]} type="video/mp4" /> : null}
        </video>
      </div>

      <div className="controls-bar" role="toolbar" aria-label="Player controls">
        <button className="btn" onClick={toggleMute} aria-label="Mute/Unmute">
          {muted ? 'Unmute' : 'Mute'}
        </button>
        <button className="btn" onClick={toggleFullscreen} aria-label="Fullscreen">Fullscreen</button>
        <button className="btn" onClick={togglePiP} aria-label="Picture in Picture" disabled={!features.PIP}>
          PiP
        </button>
        <button className="btn" onClick={openMini} aria-label="Mini player" disabled={!features.MINI_PLAYER}>
          Mini
        </button>
        <label className="toggle" aria-label="Autoplay next">
          <input type="checkbox" checked={autoplay} onChange={onAutoplayToggle} />
          Autoplay next
        </label>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Volume</span>
          <input type="range" min="0" max="1" step="0.05" onChange={onVolume} defaultValue={Number(localStorage.getItem('se.volume')) || 1} />
        </div>
      </div>
    </div>
  );
}
