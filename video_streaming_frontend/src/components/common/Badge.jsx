import React from 'react';

// PUBLIC_INTERFACE
export default function Badge({ children, color = 'var(--primary)' }) {
  /** Small badge for counts or tags */
  return (
    <span style={{
      display: 'inline-block',
      background: color,
      color: '#fff',
      borderRadius: 999,
      padding: '2px 8px',
      fontSize: 12,
      lineHeight: 1.6
    }}>{children}</span>
  );
}
