import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/videos';

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Sidebar category navigation */
  return (
    <aside className="sidebar" role="complementary" aria-label="Categories">
      {categories.map((c) => (
        <Link key={c.slug} to={`/category/${c.slug}`} className="category">
          #{c.name}
        </Link>
      ))}
    </aside>
  );
}
