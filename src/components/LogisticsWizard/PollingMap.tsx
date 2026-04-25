import React from 'react';
import { GoogleMapsService } from '../../services/GoogleMapsService';
import type { ElectionInfo } from '../../hooks/useElectionData';

interface PollingMapProps {
  data: ElectionInfo;
}

export function PollingMap({ data }: PollingMapProps) {
  if (!data.pollingLocation) return null;

  const embedUrl = GoogleMapsService.getEmbedUrl(data.originAddress, data.pollingLocation.lat, data.pollingLocation.lng);

  return (
    <div className="animate-fade-in glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ padding: '2rem 2rem 1rem 2rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Your Polling Location</h3>
        <p style={{ color: '#d1d5db', fontSize: '0.875rem' }}>{data.pollingLocation.address}</p>
      </div>
      
      <div style={{ flex: 1, minHeight: '300px', backgroundColor: 'var(--surface-2)', position: 'relative' }}>
        {/*
          Using an iframe for Google Maps Embed API is fully keyboard accessible natively.
          We provide a title attribute to pass WCAG AAA standards.
        */}
        {embedUrl ? (
          <iframe
            title="Interactive map displaying your nearest polling location and transit routes"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={embedUrl}
            tabIndex={0}
          ></iframe>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            Map will render here when a valid API key is provided.
          </div>
        )}
      </div>
    </div>
  );
}
