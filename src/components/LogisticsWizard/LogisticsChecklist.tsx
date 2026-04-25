import React from 'react';
import type { ElectionInfo } from '../../hooks/useElectionData';

interface LogisticsChecklistProps {
  data: ElectionInfo;
  onSyncCalendar: () => void;
  syncing: boolean;
}

export function LogisticsChecklist({ data, onSyncCalendar, syncing }: LogisticsChecklistProps) {
  const milestones = [
    { label: 'Register to Vote Deadline', date: data.registrationDeadline },
    { label: 'Early Voting Window', date: data.earlyVotingDates },
    { label: 'Mail-in Ballot Request', date: data.mailInDeadline },
    { label: 'Election Day', date: data.electionDate },
  ];

  return (
    <div className="animate-fade-in glass-panel" style={{ padding: '2rem', flex: 1 }}>
      <h3 style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Your Voting Checklist</span>
        <button 
          className="btn-primary" 
          onClick={onSyncCalendar}
          disabled={syncing}
          style={{ fontSize: '0.875rem', padding: '8px 16px', background: 'var(--surface-2)' }}
          aria-label="Sync all deadlines to Google Calendar"
        >
          {syncing ? 'Syncing...' : 'Sync to Calendar'}
        </button>
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {milestones.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--surface-1)', borderRadius: '8px' }}>
            <div 
              role="checkbox" 
              aria-checked="false"
              tabIndex={0}
              style={{
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                border: '2px solid var(--accent-primary)',
                cursor: 'pointer'
              }}
            ></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '500' }}>{item.label}</div>
              <div style={{ fontSize: '0.875rem', color: '#d1d5db' }}>{item.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
