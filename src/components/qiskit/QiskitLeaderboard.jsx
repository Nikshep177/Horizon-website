import React, { useState } from 'react';
import * as XLSX from 'xlsx';

export default function QiskitLeaderboard() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const wsName = workbook.SheetNames[0];
      const ws = workbook.Sheets[wsName];
      const parsedData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      if (parsedData.length > 0) {
        setColumns(parsedData[0]); // First row as headers
        setData(parsedData.slice(1)); // Remaining rows as data
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <section>
      <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem' }}>Challenges & Leaderboard</h2>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
        Upload or sync your scores sheet (.xlsx, .csv) to view the live rankings.
      </p>

      {/* File Upload Selector */}
      <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #334155', marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
          Upload Excel File:
        </label>
        <input 
          type="file" 
          accept=".xlsx, .xls, .csv" 
          onChange={handleFileUpload} 
          style={{ color: '#94a3b8', fontSize: '0.9rem' }}
        />
      </div>

      {/* Leaderboard Table Display */}
      {data.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#1e293b', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <thead>
              <tr style={{ backgroundColor: '#334155', color: '#fff', textAlign: 'left' }}>
                {columns.map((col, idx) => (
                  <th key={idx} style={{ padding: '0.75rem 1rem', fontSize: '0.9rem' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rIdx) => (
                <tr key={rIdx} style={{ borderBottom: '1px solid #334155', color: '#cbd5e1' }}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} style={{ padding: '0.75rem 1rem', fontSize: '0.9rem' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', backgroundColor: '#1e293b', borderRadius: '0.5rem', border: '1px dashed #334155', color: '#94a3b8' }}>
          No score data uploaded yet. Upload an Excel sheet above to view live standings.
        </div>
      )}
    </section>
  );
}
