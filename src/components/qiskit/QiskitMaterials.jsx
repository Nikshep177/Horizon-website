export default function QiskitMaterials() {
  const materials = [
    {
      title: 'Tutorial 1',
      url: '/assets/qiskit-documents/QiskitFallFest_Tutorial_1.pdf',
    },
  ];

  return (
    <section className="qiskit-section">
      <h2 className="qiskit-section__title">Materials &amp; Lecture Notes</h2>
      <div className="qiskit-panel" style={{ marginBottom: '1.5rem' }}>
        <p className="qiskit-body" style={{ margin: 0 }}>
          Presentation slides, tutorial links, and reference documents will be published here.
        </p>
      </div>

      <div className="qiskit-calendar__list">
        {materials.map((material, index) => (
          <div key={index} className="qiskit-calendar__item">
            <div className="qiskit-calendar__text">
              <span className="qiskit-calendar__title">{material.title}</span>
            </div>
            <a
              href={material.url}
              target="_blank"
              rel="noopener noreferrer"
              className="qiskit-btn qiskit-btn--primary"
            >
              Download PDF
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
