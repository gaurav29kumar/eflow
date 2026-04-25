import { useState, useCallback } from 'react';

export function useCalendarIntegration() {
  const [syncing, setSyncing] = useState<boolean>(false);
  const [syncSuccess, setSyncSuccess] = useState<boolean>(false);

  // Helper to convert arbitrary date strings to Google Calendar YYYYMMDD format
  const formatForGoogleCalendar = (dateStr: string) => {
    try {
      // Basic fallback logic: if it can't parse, default to today
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return null;
      
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      
      return `${yyyy}${mm}${dd}/${yyyy}${mm}${dd}`; // All day event
    } catch {
      return null;
    }
  };

  const syncToGoogleCalendar = useCallback((events: { title: string, date: string }[]) => {
    setSyncing(true);
    
    // We open a new tab for each event - though ideally for multiple we'd do an ICS, 
    // for seamless interaction zero-auth, opening the primary Election Day intent is standard.
    // For simplicity, we'll sync the primary one, or iterate them.
    events.forEach((event, index) => {
      const dates = formatForGoogleCalendar(event.date);
      if (dates) {
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${dates}&details=${encodeURIComponent('Created via eflow - Your Election Logistics Assistant')}`;
        
        // Open each event with a slight delay to allow browsers to process multiple tabs
        setTimeout(() => {
            window.open(url, '_blank');
        }, index * 200);
      }
    });

    setSyncSuccess(true);
    setTimeout(() => setSyncing(false), 1000);
    
  }, []);

  return { syncing, syncSuccess, syncToGoogleCalendar };
}
