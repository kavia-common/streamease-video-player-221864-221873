import React from 'react';

// PUBLIC_INTERFACE
export default function VideoGrid({ children }) {
  /** Responsive grid container for video cards */
  return <div className="grid">{children}</div>;
}
