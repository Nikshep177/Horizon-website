import React from 'react';

export default function QiskitCalendar() {
  const calendarEvents = [
    { date: '25 / 09 / 2026', title: 'Opening of registration' },
    { date: '10 / 10 / 2026', title: 'Provision of materials and tasks' },
    { date: '24 / 10 / 2026', title: 'Introductory session to Hilbert Spaces and Qubits' },
    { date: '25 / 10 / 2026', title: 'Introduction to Entanglement and Density matrices' },
    { date: '25 / 10 / 2026', title: 'Qiskit 101 workshop' },
    { date: '26 / 10 / 2026', title: 'Lecture session with practice problem' },
    { date: '27 / 10 / 2026', title: 'Lecture session with practice problem' },
    { date: '28 / 10 / 2026', title: 'Lecture session with practice problem' },
    { date: '29 / 10 / 2026', title: 'Applications of Quantum computing' },
    { date: '31 / 10 / 2026', title: 'Hackathon starts' },
    { date: '01 / 11 / 2026', title: 'Hackathon terminates' },
    { date: '04 / 11 / 2026', title: 'Commencement and Result announcement' },
  ];

  return (
    <section>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: '#fff' }}>Session Calendar</h2>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
        * Timings are yet to be updated
      </p>

      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {calendarEvents.map((event, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#1e293b',
              padding: '1rem 1.25rem',
              borderRadius: '0.5rem',
              borderLeft: '4px solid #3b82f6',
            }}
          >
            <span style={{ fontWeight: '500', color: '#f8fafc' }}>{event.title}</span>
            <span style={{ fontSize: '0.85rem', color: '#60a5fa', backgroundColor: '#0f172a', padding: '0.25rem 0.6rem', borderRadius: '0.25rem' }}>
              {event.date}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
