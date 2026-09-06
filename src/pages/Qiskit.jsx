import React, { useState } from 'react';
import QiskitIntro from '../components/qiskit/QiskitIntro';
import QiskitCalendar from '../components/qiskit/QiskitCalendar';
import QiskitLeaderboard from '../components/qiskit/QiskitLeaderboard';
import QiskitMaterials from '../components/qiskit/QiskitMaterials';
import QiskitExercises from '../components/qiskit/QiskitExercises';
import QiskitHackathon from '../components/qiskit/QiskitHackathon';
import QiskitSpeakers from '../components/qiskit/QiskitSpeakers';

export default function Qiskit() {
  const [activeTab, setActiveTab] = useState('intro');

  const tabs = [
    { id: 'intro', label: 'Intro & Registration' },
    { id: 'calendar', label: 'Session Calendar' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'materials', label: 'Materials & Lectures' },
    { id: 'exercises', label: 'Coding Exercises' },
    { id: 'hackathon', label: 'Hackathon' },
    { id: 'speakers', label: 'Speakers & Organizers' },
  ];

  return (
    <article 
      className="page qiskit-page" 
      style={{ 
        backgroundColor: '#0f172a', 
        color: '#f8fafc', 
        minHeight: '100vh', 
        padding: '2rem 1rem',
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        
        {/* Header with Top-Right Logo */}
        <header 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '2rem',
            borderBottom: '1px solid #1e293b',
            paddingBottom: '1.5rem'
          }}
        >
          <div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '700', margin: 0, letterSpacing: '-0.025em' }}>
              Qiskit Fallfest 2026
            </h1>
            <p style={{ margin: '0.25rem 0 0', color: '#94a3b8', fontSize: '1rem' }}>
              Horizon — The Physics and Astronomy Club, IIT Madras
            </p>
          </div>
          <img 
            src="/qiskit_white.png" 
            alt="Qiskit Logo" 
            style={{ width: '56px', height: '56px', objectFit: 'contain' }} 
          />
        </header>

        {/* Navigation Tabs */}
        <nav 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.5rem', 
            marginBottom: '2rem' 
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '0.5rem',
                  border: '1px solid',
                  borderColor: isActive ? '#3b82f6' : '#334155',
                  backgroundColor: isActive ? '#3b82f6' : '#1e293b',
                  color: '#ffffff',
                  fontWeight: isActive ? '600' : '500',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Dynamic Tab Content */}
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
