export default function QiskitIntro() {
  const registrationLink = '';

  return (
    <section className="qiskit-section">
      <h2 className="qiskit-section__title">Welcome to Qiskit Fallfest 2026!</h2>

      <p className="qiskit-body" style={{ marginBottom: '1.5rem' }}>
        Hi Junta! Welcome to Qiskit Fallfest 2026. Qiskit Fallfest is a collection of events
        related to Quantum computing and Quantum information supported by IBM and organized by
        various institutes across the world.
      </p>

      <p className="qiskit-body" style={{ marginBottom: '1.5rem' }}>
        Last year Horizon club along with Quantum computing society of IITM hosted Qiskit
        Fallfest in IITM. Various events related to Quantum computing and Quantum key
        distribution using Qiskit were conducted and concluded with a Hackathon.
      </p>

      <p className="qiskit-body" style={{ marginBottom: '1.5rem' }}>
        We are back this year. This year we have planned to conduct sessions related to Open
        quantum systems, Error correction and Optimization using Quantum computers. We have
        also planned fun tasks and exercises to keep the learning process engaging and fun.
      </p>

      <div className="qiskit-panel qiskit-panel--accent" style={{ marginBottom: '1.5rem' }}>
        <h3 className="qiskit-section__title" style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
          What you gain through the Fallfest
        </h3>
        <ul className="qiskit-highlight-list">
          <li>Introductory knowledge in Quantum computation and Quantum information.</li>
          <li>Error correction and error mitigation in Quantum computing.</li>
          <li>Coding quantum algorithms using IBM Qiskit and produce results.</li>
          <li>Domain knowledge of existing quantum computing hardware and their capabilities.</li>
        </ul>
      </div>

      <p className="qiskit-body" style={{ marginBottom: '1.5rem' }}>
        Participation is <strong>free of cost</strong>. Every participant with considerable
        involvement in sessions and a Hackathon submission shall receive{' '}
        <strong>certificates authorized by IBM</strong>.
      </p>

      <div className="qiskit-panel qiskit-panel--highlight" style={{ marginBottom: '2rem' }}>
        <h3 className="qiskit-section__title" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          Event Registration
        </h3>
        <p className="qiskit-body" style={{ fontSize: '0.9rem', margin: '0 0 1rem', opacity: 0.8 }}>
          {registrationLink
            ? 'Click the button below to complete your registration.'
            : 'Registration link will be activated on 25 / 09 / 2026.'}
        </p>

        {registrationLink ? (
          <a
            href={registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="qiskit-btn qiskit-btn--primary"
          >
            Register for Fallfest 2026
          </a>
        ) : (
          <button type="button" disabled className="qiskit-btn qiskit-btn--disabled">
            Registration Opening Soon
          </button>
        )}
      </div>

      <blockquote className="qiskit-quote">
        &quot;WINTER IS COMING !!&quot;
        <cite>— But first comes the fall ....</cite>
      </blockquote>
    </section>
  );
}