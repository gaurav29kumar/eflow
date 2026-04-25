import { WizardContainer } from '../components/LogisticsWizard/WizardContainer';

export default function Home() {
  return (
    <main id="top" style={{ minHeight: '100vh', padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ marginBottom: '1rem', background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          eflow
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#d1d5db', maxWidth: '600px', margin: '0 auto' }}>
          Your personalized election logistics assistant. From registration to ballot drop-off, seamlessly plan your vote.
        </p>
      </header>

      <section style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <WizardContainer />
      </section>

      <footer style={{ marginTop: 'auto', paddingTop: '4rem', color: '#d1d5db', fontSize: '0.875rem' }}>
        <p>Eflow is a non-partisan utility. Powered by Google Civic Information API.</p>
      </footer>
    </main>
  );
}
