import { useState } from 'react';
import QiskitBackground from '../components/qiskit/QiskitBackground';
import QiskitIntro from '../components/qiskit/QiskitIntro';
import QiskitCalendar from '../components/qiskit/QiskitCalendar';
import QiskitLeaderboard from '../components/qiskit/QiskitLeaderboard';
import QiskitMaterials from '../components/qiskit/QiskitMaterials';
import QiskitExercises from '../components/qiskit/QiskitExercises';
import QiskitHackathon from '../components/qiskit/QiskitHackathon';
import QiskitSpeakers from '../components/qiskit/QiskitSpeakers';
import '../styles/qiskit.css';

export default function Qiskit() {
  const [activeTab, setActiveTab] = useState('intro');

  const tabs = [
    { id: 'intro', label: 'Overview' },
    { id: 'calendar', label: 'Session Calendar' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'materials', label: 'Materials & Lectures' },
    { id: 'exercises', label: 'Coding Exercises' },
    { id: 'hackathon', label: 'Hackathon' },
    { id: 'speakers', label: 'Speakers & Organizers' },
  ];

  return (
    <article className="qiskit-page">
      <QiskitBackground />

      <div className="qiskit-page__content">
        <header className="qiskit-hero">
          <div className="qiskit-hero__text">
            <span className="qiskit-hero__badge">Fallfest 2026 · IIT Madras</span>
            <h1 className="qiskit-hero__title">
              <span className="qiskit-hero__brand">Qiskit</span> Fallfest
            </h1>
            <p className="qiskit-hero__subtitle">
              Horizon — The Physics and Astronomy Club, IIT Madras
            </p>
          </div>
          <img
            className="qiskit-hero__logo"
            src="/qiskit_white.png"
            alt="Qiskit Logo"
          />
        </header>

        <nav className="qiskit-nav" aria-label="Qiskit Fallfest sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`qiskit-nav__pill${activeTab === tab.id ? ' qiskit-nav__pill--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <main>
          {activeTab === 'intro' && <QiskitIntro />}
          {activeTab === 'calendar' && <QiskitCalendar />}
          {activeTab === 'leaderboard' && <QiskitLeaderboard />}
          {activeTab === 'materials' && <QiskitMaterials />}
          {activeTab === 'exercises' && <QiskitExercises />}
          {activeTab === 'hackathon' && <QiskitHackathon />}
          {activeTab === 'speakers' && <QiskitSpeakers />}
        </main>
      </div>
    </article>
  );
}