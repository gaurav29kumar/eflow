import { useState, useCallback } from 'react';

export function useCalendarIntegration() {
  const [syncing, setSyncing] = useState<boolean>(false);
  const [syncSuccess, setSyncSuccess] = useState<boolean>(false);

  // Helper to convert arbitrary date strings to Google Calendar standard Date format
  const formatForGoogleCalendar = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return null;
      
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      
      return `${yyyy}-${mm}-${dd}`;
    } catch {
      return null;
    }
  };

  const syncToGoogleCalendar = useCallback(async (events: { title: string, date: string }[]) => {
    const token = sessionStorage.getItem('eflow_calendar_token');
    
    if (!token) {
      alert("Please Sign In via the Menu Bar to authorize Google Calendar Sync.");
      return;
    }

    if (token === "mock_dev_token") {
        setSyncing(true);
        setTimeout(() => {
            setSyncSuccess(true);
            setSyncing(false);
            alert("MOCK MODE: Calendar Sync Successful (No real API hit due to missing keys).");
        }, 1000);
        return;
    }

    setSyncing(true);
    
    try {
      // Execute strict Google Calendar API endpoint calls
      for (const event of events) {
        const dateStr = formatForGoogleCalendar(event.date);
        if (!dateStr) continue;

        const eventBody = {
          summary: event.title,
          description: "Created via eflow - Your Election Logistics Assistant",
          start: { date: dateStr },
          end: { date: dateStr } // All-day event
        };

        const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(eventBody)
        });

        if (!response.ok) {
           throw new Error("Failed to sync event: " + event.title);
        }
      }
      setSyncSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Failed to sync calendar. Ensure you signed in with proper permissions.");
    } finally {
      setSyncing(false);
    }
    
  }, []);

  return { syncing, syncSuccess, syncToGoogleCalendar };
}
