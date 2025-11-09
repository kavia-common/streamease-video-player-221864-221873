import React from 'react';

// PUBLIC_INTERFACE
export default function Toggle({ checked, onChange, label }) {
  /** Simple checkbox toggle with label */
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}
