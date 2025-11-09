import React, { useContext, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VideoPlayer from '../components/Player/VideoPlayer';
import { videos } from '../data/videos';
import VideoCard from '../components/VideoCard';
import { UIContext } from '../state/uiSlice';

// PUBLIC_INTERFACE
export default function Watch() {
  /**
   * Watch page with main player, details, and up next sidebar
   */
  const { id } = useParams();
  const navigate = useNavigate();
  const { uiState } = useContext(UIContext);

  const current = useMemo(() => videos.find((v) => String(v.id) === String(id)) || videos[0], [id]);
  const upNext = useMemo(() => videos.filter((v) => v.id !== current.id).slice(0, 12), [current]);

  function onEndedAutoplay(nextVideo) {
    navigate(`/watch/${nextVideo.id}`);
  }

  return (
    <section className="player-wrap">
      <div>
        <VideoPlayer video={current} upNext={upNext} onEndedAutoplay={onEndedAutoplay} />
        <h1 style={{ marginTop: 10 }}>{current.title}</h1>
        <div className="card-meta">{current.channel || 'StreamEase'} • {current.views?.toLocaleString?.() || '—'} views</div>
        <div style={{ marginTop: 12 }}>
          <Comments />
        </div>
      </div>
      <aside>
        <div className="controls-bar" style={{ marginBottom: 8 }}>
          <span style={{ fontWeight: 600 }}>Up Next</span>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-secondary)' }}>
            Theme: {uiState.theme}
          </span>
        </div>
        <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
          {upNext.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </aside>
    </section>
  );
}

function Comments() {
  const sample = [
    { id: 1, author: 'Alex', text: 'Great content! Smooth playback 👌' },
    { id: 2, author: 'Sam', text: 'PiP and mini player are super handy.' },
    { id: 3, author: 'Taylor', text: 'Love the clean layout.' },
  ];
  return (
    <div className="comments" aria-label="Comments">
      {sample.map((c) => (
        <div key={c.id} className="comment">
          <strong>{c.author}</strong>
          <div style={{ color: 'var(--text-secondary)' }}>{c.text}</div>
        </div>
      ))}
    </div>
  );
}
