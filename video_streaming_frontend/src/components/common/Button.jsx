import React from 'react';

// PUBLIC_INTERFACE
export default function Button({ children, onClick, variant = 'default', ...rest }) {
  /** Styled button */
  const cls = variant === 'primary' ? 'btn primary' : 'btn';
  return <button className={cls} onClick={onClick} {...rest}>{children}</button>;
}
