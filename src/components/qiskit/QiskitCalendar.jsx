export default function QiskitCalendar() {
  const calendarEvents = [
    {
      date: '24 / 10 / 2026',
      time: '2:00 PM – 4:00 PM',
      title: 'Introductory session to Hilbert Spaces and Qubits',
    },
    {
      date: '25 / 10 / 2026',
      time: '2:00 PM – 4:00 PM',
      title: 'Introduction to Entanglement and Density matrices',
    },
    {
      date: '26 / 10 / 2026',
      time: '6:30 PM – 7:45 PM',
      title: 'Mapping the Quantum Landscape: From Fundamentals to the Big Picture',
      speaker: 'Rohit, IBM Qiskit Advocate',
    },
    {
      date: '27 / 10 / 2026',
      time: '6:30 PM – 7:45 PM',
      title: 'Recent advancements in Quantum algorithms',
      speaker: 'Dhinakaran, IBM employee, Adjunct professor',
    },
    {
      date: '28 / 10 / 2026',
      time: '6:30 PM – 7:45 PM',
      title: 'How Mathematicians Model Quantum States and Channels',
      speaker: 'Professor Sumesh, IITM',
    },
    {
      date: '29 / 10 / 2026',
      time: '6:30 PM – 7:45 PM',
      title: 'Quantum error correction',
      speaker: 'Professor Prabha',
    },
    {
      date: '30 / 10 / 2026',
      title: 'Special lecture',
      speaker: 'Siddardha, Educator',
    },
    {
      date: '30 / 10 / 2026',
      title: 'Variational quantum eigensolver',
    },
    {
      date: '31 / 10 / 2026 – 01 / 11 / 2026',
      title: 'Hackathon',
    },
  ];

  return (
    <section className="qiskit-section">
      <h2 className="qiskit-section__title">Session Calendar</h2>

      <div className="qiskit-calendar__list">
        {calendarEvents.map((event, index) => (
          <div key={index} className="qiskit-calendar__item">
            <div className="qiskit-calendar__text">
              <span className="qiskit-calendar__title">{event.title}</span>
              {event.speaker && (
                <span className="qiskit-calendar__description">Speaker: {event.speaker}</span>
              )}
              {event.time && (
                <span className="qiskit-calendar__description">Time: {event.time}</span>
              )}
            </div>
            <span className="qiskit-calendar__date">{event.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}