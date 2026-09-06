import React from 'react';

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
  ];


  return (
    <section>
      <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1.25rem' }}>Speakers</h2>
      <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {speakers.map((speaker, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#1e293b',
              padding: '1.25rem',
              borderRadius: '0.5rem',
              border: '1px solid #334155'
            }}
          >
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.2rem', color: '#60a5fa' }}>{speaker.name}</h3>
            <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 'bold', color: '#94a3b8' }}>
              {speaker.title}
            </p>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6', color: '#cbd5e1' }}>{speaker.bio}</p>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>Organizers</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {organizers.map((org, index) => (
          <span
            key={index}
            style={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              color: '#f8fafc',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontSize: '0.95rem',
            }}
          >
            {org}
          </span>
        ))}
      </div>
    </section>
  );
}
