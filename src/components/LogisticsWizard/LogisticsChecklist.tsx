import React, { useState } from 'react';
import type { ElectionInfo } from '../../hooks/useElectionData';

interface LogisticsChecklistProps {
  data: ElectionInfo;
  onSyncCalendar: () => void;
  syncing: boolean;
}

export function LogisticsChecklist({ data, onSyncCalendar, syncing }: LogisticsChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false]);

  const milestones = [
    { label: 'Register to Vote Deadline', date: data.registrationDeadline },
    { label: 'Early Voting Window', date: data.earlyVotingDates },
    { label: 'Mail-in Ballot Request', date: data.mailInDeadline },
    { label: 'Election Day', date: data.electionDate },
  ];

  const toggleCheck = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleCheck(index);
    }
  };

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
              aria-checked={checkedItems[index]}
              tabIndex={0}
              onClick={() => toggleCheck(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={{
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                border: '2px solid var(--accent-primary)',
                background: checkedItems[index] ? 'var(--accent-primary)' : 'transparent',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
              aria-label={`Mark ${item.label} as complete`}
            ></div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', textDecoration: checkedItems[index] ? 'line-through' : 'none', color: checkedItems[index] ? '#6b7280' : 'inherit' }}>{item.label}</div>
                <div style={{ fontSize: '0.875rem', color: '#d1d5db' }}>{item.date}</div>
              </div>
              {index === 0 && (
                <a 
                  href="https://vote.gov/register" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', background: 'var(--accent-secondary)', color: 'white', fontWeight: 'bold' }}
                >
                  Verify Status
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
