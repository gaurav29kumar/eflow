'use client';

import React from 'react';
import { useElectionData } from '../../hooks/useElectionData';
import { useCalendarIntegration } from '../../hooks/useCalendarIntegration';
import { AddressInput } from './AddressInput';
import { LogisticsChecklist } from './LogisticsChecklist';
import { PollingMap } from './PollingMap';

export function WizardContainer() {
  const { loading, error, electionInfo, fetchElectionData } = useElectionData();
  const { syncing, syncSuccess, syncToGoogleCalendar } = useCalendarIntegration();

  const handleSync = () => {
    if (electionInfo) {
      syncToGoogleCalendar([
        { title: "Register to Vote Deadline", date: electionInfo.registrationDeadline },
        { title: "Election Day", date: electionInfo.electionDate }
      ]);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      <AddressInput onSubmit={fetchElectionData} loading={loading} />
      
      {error && (
        <div style={{ color: 'var(--error)', padding: '1rem', background: 'var(--surface-1)', borderRadius: '8px', marginBottom: '2rem' }}>
          {error}
        </div>
      )}

      {electionInfo && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div id="checklist-section" style={{ scrollMarginTop: '100px' }}>
            <LogisticsChecklist 
              data={electionInfo} 
              onSyncCalendar={handleSync} 
              syncing={syncing}
            />
          </div>
          <div id="map-section" style={{ scrollMarginTop: '100px' }}>
            <PollingMap data={electionInfo} />
          </div>
          
          {syncSuccess && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--success)', padding: '1rem' }} className="animate-fade-in">
              Successfully synced to your calendar!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
