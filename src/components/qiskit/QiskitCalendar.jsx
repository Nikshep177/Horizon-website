export default function QiskitCalendar() {
  const calendarEvents = [
    { date: '25 / 09 / 2026', title: 'Opening of registration' },
    { date: '10 / 10 / 2026', title: 'Provision of materials and tasks', description: 'We will provide various notebooks and lecture videos to familiarize Quantum computing. We will also provide tasks for participants.' },
    { date: '24 / 10 / 2026', title: 'Introductory session to Hilbert Spaces and Qubits', description: 'The session will cover maths behind Quantum computing, Vector notation of Qubits, Measurement and Collapse of Quantum states.' },
    { date: '25 / 10 / 2026', title: 'Introduction to Entanglement and Density matrices', description: 'The session will cover Density matrices, mixed quantum states and Entanglement.' },
    { date: '25 / 10 / 2026', title: 'Qiskit 101 workshop', description: 'The workshop will guide the attendees to code Quantum algorithms using Qiskit and analyze results.' },
    { date: '26 / 10 / 2026', title: 'Lecture session with practice problem' },
    { date: '27 / 10 / 2026', title: 'Lecture session with practice problem' },
    { date: '28 / 10 / 2026', title: 'Lecture session with practice problem' },
    { date: '29 / 10 / 2026', title: 'Applications of Quantum computing', description: 'The session covers all the potential aspects of Quantum computing and modern quantum hardware - Uses and Limitations' },
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
            <div className="qiskit-calendar__text">
              <span className="qiskit-calendar__title">{event.title}</span>
              {event.description && (
                <span className="qiskit-calendar__description">{event.description}</span>
              )}
            </div>
            <span className="qiskit-calendar__date">{event.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}