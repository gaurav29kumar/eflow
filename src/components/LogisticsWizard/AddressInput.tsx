import React, { useState } from 'react';

interface AddressInputProps {
  onSubmit: (address: string) => void;
  loading: boolean;
}

export function AddressInput({ onSubmit, loading }: AddressInputProps) {
  const [inputVal, setInputVal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSubmit(inputVal);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h2 style={{ marginBottom: '1rem', color: 'var(--foreground)' }}>Find Your Polling Place</h2>
      <p style={{ marginBottom: '1.5rem' }}>Enter your ZIP code or full address to generate your personalized election roadmap.</p>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <input 
          type="text" 
          className="input-field"
          placeholder="e.g. 90210 or 123 Main St..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          aria-label="Address or Zip Code Input"
          required
        />
        <button 
          type="submit" 
          className="btn-primary" 
          disabled={loading}
          style={{ whiteSpace: 'nowrap' }}
        >
          {loading ? 'Searching...' : 'Go'}
        </button>
      </div>
    </form>
  );
}
