'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Something went wrong!</h2>
      <p style={{ marginBottom: '2rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
        An unexpected error occurred while rendering this page.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.75rem 1.5rem',
          background: 'var(--primary)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius)',
          cursor: 'pointer',
          fontWeight: '500'
        }}
      >
        Try again
      </button>
    </div>
  );
}
