import React from 'react';

export default function QiskitIntro() {
  // PASTE YOUR REGISTRATION LINK HERE WHEN READY
  const registrationLink = ""; 

  return (
    <section style={{ lineHeight: '1.7', color: '#cbd5e1' }}>
      <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>
        Welcome to Qiskit Fallfest 2026!
      </h2>
      
      <p style={{ marginBottom: '1rem' }}>
        Hi Junta! Welcome to Qiskit Fallfest 2026. Qiskit Fallfest is a collection of events related to Quantum computing and Quantum information supported by IBM and organized by various institutes across the world.
      </p>

      <p style={{ marginBottom: '1rem' }}>
        Last year Horizon club along with Quantum computing society of IITM hosted Qiskit fallfest in IITM. Various events related to Quantum computing and Quantum key distribution using Qiskit were conducted and concluded with a Hackathon.
      </p>

      <p style={{ marginBottom: '1.5rem' }}>
        We are back this year. This year we have planned to conduct sessions related to Open quantum systems, Error correction and Optimization using Quantum computers. We have also planned fun tasks and exercises to keep the learning process engaging and fun.
      </p>

      <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #334155', marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#60a5fa', fontSize: '1.15rem', marginTop: 0, marginBottom: '0.75rem' }}>
          What you gain through the Fallfest:
        </h3>
        <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
          <li>Introductory knowledge in Quantum computation and Quantum information.</li>
          <li>Error correction and error mitigation in Quantum computing.</li>
          <li>Coding quantum algorithms using IBM Qiskit and produce results.</li>
          <li>Domain knowledge of existing quantum computing hardware and their capabilities.</li>
        </ul>
      </div>

      <p style={{ marginBottom: '1.5rem' }}>
        Participation is <strong>free of cost</strong>. Every participant with considerable involvement in sessions and a Hackathon submission shall receive <strong>certificates authorized by IBM</strong>.
      </p>

      {/* REGISTRATION LINK BLOCK */}
      <div 
        style={{ 
          backgroundColor: '#1e293b', 
          border: '2px dashed #3b82f6', 
          borderRadius: '0.75rem', 
          padding: '1.5rem', 
          textAlign: 'center',
          marginBottom: '2rem'
        }}
      >
        <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0' }}>Event Registration</h3>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '0 0 1rem 0' }}>
          {registrationLink ? "Click the button below to complete your registration." : "Registration link will be activated on 25 / 09 / 2026."}
        </p>
        
        {registrationLink ? (
          <a
            href={registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              backgroundColor: '#3b82f6',
              color: '#fff',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Register for Fallfest 2026
          </a>
        ) : (
          <button
            disabled
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#334155',
              color: '#94a3b8',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'not-allowed',
              fontWeight: 'bold',
            }}
          >
            Registration Opening Soon
          </button>
        )}
      </div>

      <blockquote style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1rem', fontStyle: 'italic', color: '#94a3b8', margin: 0 }}>
        "WINTER IS COMING !!" <br />
        <span style={{ fontSize: '0.875rem' }}>— But first comes the fall ....</span>
      </blockquote>
    </section>
  );
}
