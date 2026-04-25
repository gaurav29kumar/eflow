import { useState, useCallback } from 'react';
import { SanitizationService } from '../services/SanitizationService';

export interface ElectionInfo {
  pollingLocation: { lat: number; lng: number; address: string } | null;
  registrationDeadline: string;
  earlyVotingDates: string;
  mailInDeadline: string;
  electionDate: string;
  originAddress: string;
}

export function useElectionData() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [electionInfo, setElectionInfo] = useState<ElectionInfo | null>(null);

  const fetchElectionData = useCallback(async (addressOrZip: string) => {
    setLoading(true);
    setError(null);
    setElectionInfo(null);

    try {
      const sanitized = SanitizationService.sanitizeAddress(addressOrZip);
      if (!sanitized) {
        throw new Error("Invalid address or Zip code provided.");
      }

      // Hit our internal ISR route to leverage cached state-wide data
      const response = await fetch(`/api/election?address=${encodeURIComponent(sanitized)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch election data.");
      }

      setElectionInfo(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch election data.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, electionInfo, fetchElectionData };
}
