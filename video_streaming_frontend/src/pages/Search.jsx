import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import VideoGrid from '../components/VideoGrid';
import VideoCard from '../components/VideoCard';
import { videos } from '../data/videos';

// PUBLIC_INTERFACE
export default function Search() {
  /** Shows search results based on ?q= */
  const location = useLocation();
  const q = useMemo(() => new URLSearchParams(location.search).get('q') || '', [location.search]);
  const result = useMemo(() => {
    const qq = q.toLowerCase();
    return videos.filter(
      (v) =>
        v.title.toLowerCase().includes(qq) ||
        (v.channel || '').toLowerCase().includes(qq) ||
        (v.category || '').toLowerCase().includes(qq)
    );
  }, [q]);

  return (
    <section aria-labelledby="search-heading">
      <h2 id="search-heading" style={{ margin: '8px 4px' }}>
        Search results for: “{q}”
      </h2>
      <VideoGrid>
        {result.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </VideoGrid>
    </section>
  );
}
