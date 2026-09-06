export default function QiskitSpeakers() {
  const speakers = [
    {
      name: 'Prabha Mandayam',
      title: 'Professor, Department of Physics, IIT Madras',
      bio: 'She is a well known researcher and Professor in the Department of Physics at the Indian Institute of Technology, Madras. She was an Inspire faculty fellow at the Chennai Mathematical Institute and a Post-Doctoral Fellow with the Optics and Quantum Information Group at the Institute of Mathematical Sciences. She obtained her PhD in Physics from the Institute for Quantum Information and Matter at Caltech. Her domain of research is Quantum computation and Quantum information especially Quantum Error correction.',
    },
    {
      name: 'Sumesh K',
      title: 'Professor, Department of Mathematics, IIT Madras',
      bio: 'He is a Professor from the Department of Mathematics at the Indian Institute of Technology, Madras. His research lies broadly in Functional Analysis, with particular emphasis on Operator Algebras, Quantum Probability, and Quantum Information Theory. His research focuses on the theory of completely positive maps and their wide-ranging applications in both operator algebras and quantum information theory.',
    },
    {
      name: 'Dhinakaran Vinayagamurthy',
      title: 'Researcher, IBM Research India | Engagement Manager, IITM-IBM Partnership',
      bio: 'He is a Researcher in the Quantum Computing research group at the IBM Research India lab Bangalore, and the Engagement Manager for the IIT Madras-IBM Quantum partnership. His research interests are quantum error mitigation, cryptography and security. At IBM, he has worked on projects around blockchain interoperability, encrypted databases, IBM Blockchain Transparent Supply and privacy-preserving machine learning.',
    },
  ];

  const organizers = [
    'Hariccharan M',
    'Nantha Kumar',
    'Harsh Meena',
    'Aditya Goel',
    'Ananya Desale',
    'Nikshep DC',
  ];

  return (
    <section className="qiskit-section">
      <h2 className="qiskit-section__title">Speakers</h2>
      <div className="qiskit-speakers-grid">
        {speakers.map((speaker, index) => (
          <article key={index} className="qiskit-speaker-card">
            <h3 className="qiskit-speaker-card__name">{speaker.name}</h3>
            <p className="qiskit-speaker-card__title">{speaker.title}</p>
            <p className="qiskit-speaker-card__bio">{speaker.bio}</p>
          </article>
        ))}
      </div>

      <h2 className="qiskit-section__title">Organizers</h2>
      <div className="qiskit-organizers">
        {organizers.map((org, index) => (
          <span key={index} className="qiskit-organizer-chip">
            {org}
          </span>
        ))}
      </div>
    </section>
  );
}