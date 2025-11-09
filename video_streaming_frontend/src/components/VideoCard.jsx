import React from 'react';
import { Link } from 'react-router-dom';
import { formatDuration } from '../utils/time';

// PUBLIC_INTERFACE
export default function VideoCard({ video }) {
  /**
   * Card showing thumbnail, title, meta; navigates to watch page.
   */
  return (
    <Link to={`/watch/${video.id}`} className="card" aria-label={`Watch ${video.title}`}>
      <div style={{ position: 'relative' }}>
        <img src={video.thumbnail} alt="" className="thumb" loading="lazy" />
        <span
          style={{
            position: 'absolute',
            right: 8,
            bottom: 8,
            background: 'rgba(0,0,0,0.7)',
            color: '#fff',
            padding: '2px 6px',
            borderRadius: 6,
            fontSize: 12,
          }}
        >
          {formatDuration(video.duration || 0)}
        </span>
      </div>
      <div className="card-body">
        <div className="card-title">{video.title}</div>
        <div className="card-meta">
          {video.channel || 'StreamEase'} • {video.views?.toLocaleString?.() || '—'} views
        </div>
      </div>
    </Link>
  );
}
