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
  const containerRef = useRef(null);
  const { playerDispatch } = useContext(PlayerContext);
  const { uiState, features } = useContext(UIContext);
  const [srcIndex, setSrcIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [autoplay, setAutoplay] = useState(uiState.autoplay);

  const sources = useMemo(() => video?.sources || [], [video]);

  // Reset sources and reload when video changes
  useEffect(() => {
    setSrcIndex(0);
    const el = videoRef.current;
    if (el) {
      try {
        // Reload element to pick new <source> tag
        el.load();
      } catch { /* ignore */ }
    }
    playerDispatch({ type: 'SET_ACTIVE', payload: video });
  }, [video, playerDispatch]);

  // Load volume/autoplay from localStorage
  useEffect(() => {
    const vol = Number(localStorage.getItem('se.volume'));
    const el = videoRef.current;
    if (!Number.isNaN(vol) && el) {
      el.volume = Math.min(1, Math.max(0, vol));
    }
  }, []);
  useEffect(() => setAutoplay(uiState.autoplay), [uiState.autoplay]);

  function onError() {
    if (srcIndex < sources.length - 1) {
      setSrcIndex((i) => i + 1);
      // ensure reload to try next <source>
      const el = videoRef.current;
      try { el && el.load(); } catch { /* noop */ }
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
        if (document.exitPictureInPicture) await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled && el.requestPictureInPicture) {
        await el.requestPictureInPicture();
      }
    } catch {
      // gracefully ignore unsupported or blocked PiP
    }
  }

  async function requestFs(target) {
    try {
      await (target.requestFullscreen?.() ||
        target.webkitRequestFullscreen?.() ||
        target.mozRequestFullScreen?.() ||
        target.msRequestFullscreen?.() ||
        Promise.resolve());
    } catch {
      // ignore
    }
  }
  async function exitFs() {
    try {
      await (document.exitFullscreen?.() ||
        document.webkitExitFullscreen?.() ||
        document.mozCancelFullScreen?.() ||
        document.msExitFullscreen?.() ||
        Promise.resolve());
    } catch {
      // ignore
    }
  }
  function isFs() {
    return !!(document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement);
  }

  function toggleFullscreen() {
    const el = containerRef.current || videoRef.current?.parentElement;
    if (!el) return;
    if (!isFs()) {
      requestFs(el);
    } else {
      exitFs();
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

  // Cleanup listeners related to fullscreenchange if we add any in future
  useEffect(() => {
    const handler = () => {};
    document.addEventListener?.('fullscreenchange', handler);
    document.addEventListener?.('webkitfullscreenchange', handler);
    document.addEventListener?.('mozfullscreenchange', handler);
    document.addEventListener?.('MSFullscreenChange', handler);
    return () => {
      document.removeEventListener?.('fullscreenchange', handler);
      document.removeEventListener?.('webkitfullscreenchange', handler);
      document.removeEventListener?.('mozfullscreenchange', handler);
      document.removeEventListener?.('MSFullscreenChange', handler);
    };
  }, []);

  // Mini player trigger
  function openMini() {
    if (!features.MINI_PLAYER) return;
    playerDispatch({ type: 'OPEN_MINI', payload: { video, currentTime: videoRef.current?.currentTime || 0, srcIndex } });
  }

  if (!video) return null;

  return (
    <div>
      <div className="player" ref={containerRef}>
        <video
          key={video.id} 
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
