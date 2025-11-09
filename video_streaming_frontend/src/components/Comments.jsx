import React from 'react';

// PUBLIC_INTERFACE
export default function Comments({ items = [] }) {
  /** Generic comments list */
  if (!items.length) {
    items = [
      { id: 1, author: 'Ava', text: 'Loving the UX and snappy player!' },
      { id: 2, author: 'Noah', text: 'Autoplay and PiP work great.' },
    ];
  }
  return (
    <div className="comments" aria-label="Comments">
      {items.map((c) => (
        <div key={c.id} className="comment">
          <strong>{c.author}</strong>
          <div style={{ color: 'var(--text-secondary)' }}>{c.text}</div>
        </div>
      ))}
    </div>
  );
}
