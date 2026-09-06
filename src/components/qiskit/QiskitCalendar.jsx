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
    <section className="qiskit-section">
      <h2 className="qiskit-section__title">Session Calendar</h2>
      <p className="qiskit-section__note">* Timings are yet to be updated</p>

      <div className="qiskit-calendar__list">
        {calendarEvents.map((event, index) => (
          <div key={index} className="qiskit-calendar__item">
            <span className="qiskit-calendar__title">{event.title}</span>
            <span className="qiskit-calendar__date">{event.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}