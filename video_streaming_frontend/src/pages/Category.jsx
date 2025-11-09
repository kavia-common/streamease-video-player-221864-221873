import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import VideoGrid from '../components/VideoGrid';
import VideoCard from '../components/VideoCard';
import { videos } from '../data/videos';

// PUBLIC_INTERFACE
export default function Category() {
  /** Lists videos within a selected category slug */
  const { slug } = useParams();
  const list = useMemo(() => videos.filter((v) => v.categorySlug === slug), [slug]);

  return (
    <section aria-labelledby="cat-heading">
      <h2 id="cat-heading" style={{ margin: '8px 4px' }}>Category: #{slug}</h2>
      <VideoGrid>
        {list.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </VideoGrid>
    </section>
  );
}
