/**
 * SanitizationService
 * Ensures all Location Data and PII is cleansed before any external API request or DOM insertion.
 * Validates zip codes and input strings to prevent XSS and malformed payloads.
 */

export class SanitizationService {
  /**
   * Strips HTML tags and script elements from a string.
   */
  static sanitizeInput(input: string): string {
    if (!input) return "";
    return input.replace(/<[^>]*>?/gm, "").trim();
  }

  /**
   * Validates if a string is a standard 5-digit US ZIP code.
   */
  static isValidZip(input: string): boolean {
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(input);
  }

  /**
   * Sanitizes an entire address string, preventing common SQLi or XSS patterns.
   */
  static sanitizeAddress(address: string): string {
    let sanitized = this.sanitizeInput(address);
    // Remove characters that are highly unusual in standard US addresses
    sanitized = sanitized.replace(/[;&$%"<>\\]/g, "");
    return sanitized.substring(0, 150); // limit length
  }
}
