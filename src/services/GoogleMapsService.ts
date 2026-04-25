/**
 * GoogleMapsService
 * Utility class for interacting securely with the Google Maps Javascript API and Geocoding API.
 */

export class GoogleMapsService {
  private static apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  /**
   * Geocodes an address to get latitude and longitude.
   */
  static async geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
    if (!this.apiKey || this.apiKey === "YOUR_GOOGLE_MAPS_API_KEY_HERE") {
      console.warn("Google Maps API Key is missing. Using mock coordinates.");
      return { lat: 38.8977, lng: -77.0365 }; // Mock: White House
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`
      );
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        return data.results[0].geometry.location;
      }
      return null;
    } catch (e) {
      console.error("Geocoding failed:", e);
      return null;
    }
  }

  /**
   * Generates a static map URL or embed URL for the polling place using real-time transit directions.
   */
  static getEmbedUrl(originAddress: string, lat: number, lng: number): string {
    if (!this.apiKey || this.apiKey === "YOUR_GOOGLE_MAPS_API_KEY_HERE") {
      // Return a public static embed or empty string if no key
      return ``;
    }
    // Forces the Map UI to compute exact transit times from origin to polling location
    return `https://www.google.com/maps/embed/v1/directions?key=${this.apiKey}&origin=${encodeURIComponent(originAddress)}&destination=${lat},${lng}&mode=transit`;
  }
}
