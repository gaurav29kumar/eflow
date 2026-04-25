'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function MenuBar() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = () => {
    if (isSignedIn) {
      setIsSignedIn(false);
    } else {
      setLoading(true);
      // Simulate Firebase Auth delay
      setTimeout(() => {
        setIsSignedIn(true);
        setLoading(false);
      }, 600);
    }
  };
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid var(--border)',
    }} className="glass-panel">
      
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          color: 'white',
          fontSize: '1.2rem'
        }}>e</div>
        <span style={{ fontWeight: '700', fontSize: '1.25rem', letterSpacing: '-0.5px' }}>eflow</span>
      </div>

      {/* Main Navigation Links */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link href="#top" className="nav-link">Voter Dashboard</Link>
        <Link href="#checklist-section" className="nav-link">My Deadlines</Link>
        <Link href="#map-section" className="nav-link">Polling Map</Link>
        <a href="https://vote.gov" target="_blank" rel="noreferrer" className="nav-link">Civic Resources</a>
      </div>

      {/* Action / Profile Area */}
      <div>
        <button 
          className="btn-primary" 
          onClick={handleAuth}
          disabled={loading}
          style={{ padding: '8px 16px', fontSize: '0.875rem', minWidth: '85px' }}
        >
          {loading ? '...' : isSignedIn ? 'Sign Out' : 'Sign In'}
        </button>
      </div>
      
    </nav>
  );
}
