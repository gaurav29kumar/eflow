'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth, googleProvider, signInWithPopup, signOut } from '../../lib/firebase';
import { GoogleAuthProvider } from 'firebase/auth';

export function MenuBar() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if token exists in session on load
    if (sessionStorage.getItem('eflow_calendar_token')) {
      setIsSignedIn(true);
    }
  }, []);

  const handleAuth = async () => {
    if (isSignedIn) {
      if (auth) await signOut(auth);
      sessionStorage.removeItem('eflow_calendar_token');
      setIsSignedIn(false);
    } else {
      setLoading(true);
      try {
        if (auth) {
          const result = await signInWithPopup(auth, googleProvider);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          if (credential?.accessToken) {
            sessionStorage.setItem('eflow_calendar_token', credential.accessToken);
          }
          setIsSignedIn(true);
        } else {
            console.warn("Firebase not configured. Using Mock Dev Login.");
            sessionStorage.setItem('eflow_calendar_token', "mock_dev_token");
            setIsSignedIn(true);
        }
      } catch (error) {
        console.error("Auth error:", error);
      } finally {
        setLoading(false);
      }
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
