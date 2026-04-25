# eflow: Election Logistics Assistant

**eflow** is a high-utility, zero-friction web application designed to convert a user's location data into a personalized, actionable voting roadmap. Built with a strict focus on security, accessibility, and modern aesthetics, eflow provides an intuitive step-by-step logistics wizard to ensure voters are prepared for Election Day.

## Core Features
*   **Dynamic Logistics Wizard**: Instantly parses zip codes or addresses to deliver customized registration deadlines, early voting dates, and mail-in ballot requirements.
*   **Live Google Services Integration**:
    *   **Google Civic Information API**: Fetches real-time, state-wide election data and polling locations based on the user's input.
    *   **Google Maps Platform**: Embeds interactive, keyboard-navigable maps providing real-time public transit directions from the user's origin to their exact polling location.
    *   **Zero-Auth Calendar Sync**: Generates native Google Calendar Web Intents, allowing users to securely sync crucial election deadlines to their personal devices with a single click—no backend OAuth required.
*   **Premium Glassmorphism UI**: A sleek, dark-mode focused aesthetic utilizing native CSS variables, smooth scrolling anchors, and the modern *Outfit* typeface.

## Engineering Architecture
*   **Next.js & TypeScript**: A strongly-typed, modular React foundation utilizing Next.js App Router.
*   **Incremental Static Regeneration (ISR)**: Civic data fetching is shifted to a dedicated backend Route Handler (`/api/election`), utilizing strict edge-caching mechanisms (`revalidate: 3600`) for blazing-fast performance.
*   **WCAG 2.1 AAA Compliance**: The interface strictly adheres to the highest accessibility standards, featuring `ARIA-checkbox` roles, robust Screen-Reader compatibility, and >8:1 color contrast ratios.
*   **Playwright E2E Testing**: Automated testing guarantees the critical "Address Input -> Map Generation -> Calendar Sync" interaction loop remains flawless across desktop and mobile form factors.

## Security 
*   **PII Protection**: User location data is strictly session-based and intercepted by a custom `SanitizationService` to strip malicious payloads (XSS/SQLi) before hitting internal APIs.
*   **Secure Secrets**: Backend API keys are never exposed to the client bundle, maintaining airtight security throughout the server-side ISR lifecycle.

## Getting Started

1. Create a `.env.local` file based on `.env.local.example`.
2. Add your `GOOGLE_CIVIC_API_KEY` and `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`
