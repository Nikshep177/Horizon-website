import { useState } from 'react';
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
        setColumns(parsedData[0]);
        setData(parsedData.slice(1));
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <section className="qiskit-section">
      <h2 className="qiskit-section__title">Challenges &amp; Leaderboard</h2>
      <p className="qiskit-body" style={{ marginBottom: '1.5rem' }}>
        Upload or sync your scores sheet (.xlsx, .csv) to view the live rankings.
      </p>

      <div className="qiskit-uploader">
        <label htmlFor="qiskit-scores-file">Upload Excel File:</label>
        <input
          id="qiskit-scores-file"
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileUpload}
        />
      </div>

      {data.length > 0 ? (
        <div className="qiskit-table-wrap">
          <table className="qiskit-table">
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="qiskit-empty">
          No score data uploaded yet. Upload an Excel sheet above to view live standings.
        </div>
      )}
    </section>
  );
}