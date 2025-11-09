import React from 'react';
import VideoGrid from '../components/VideoGrid';
import VideoCard from '../components/VideoCard';
import { videos } from '../data/videos';

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page showing all videos */
  return (
    <section aria-labelledby="home-heading">
      <h2 id="home-heading" style={{ margin: '8px 4px' }}>Recommended</h2>
      <VideoGrid>
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </VideoGrid>
    </section>
  );
}
