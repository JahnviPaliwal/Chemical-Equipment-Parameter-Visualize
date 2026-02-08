//import React, { useEffect, useState } from "react";
//import { getHistory, downloadPDF } from "../api/api";
//
//function History() {
//  const [history, setHistory] = useState([]);
//
//  useEffect(() => {
//    async function fetchHistory() {
//      const data = await getHistory();
//      setHistory(data);
//    }
//    fetchHistory();
//  }, []);
//
//  return (
//    <div className="card">
//      <h2>History</h2>
//      <ul>
//        {history.map((item) => (
//          <li key={item.id}>
//            {item.filename} - {new Date(item.uploaded_at).toLocaleString()} &nbsp;
//            <button onClick={() => downloadPDF(item.pdf)}>View PDF</button>
//          </li>
//        ))}
//      </ul>
//    </div>
//  );
//}
//
//export default History;




//import React, { useEffect, useState } from "react";
//import { getHistory } from "../api/api";
//
//function History() {
//  const [history, setHistory] = useState([]);
//  const [loading, setLoading] = useState(false);
//
//  const fetchHistory = async () => {
//    try {
//      setLoading(true);
//      const data = await getHistory();
//
//      // Safety: ensure array + latest 5
//      if (Array.isArray(data)) {
//        setHistory(data.slice(0, 5));
//      } else {
//        setHistory([]);
//      }
//    } catch (error) {
//      console.error("Failed to fetch history:", error);
//    } finally {
//      setLoading(false);
//    }
//  };
//
//  useEffect(() => {
//    fetchHistory();
//
//    // 🔥 Listen for upload completion
//    const refreshHandler = () => fetchHistory();
//    window.addEventListener("refresh-history", refreshHandler);
//
//    return () => {
//      window.removeEventListener("refresh-history", refreshHandler);
//    };
//  }, []);
//
//  return (
//    <div>
//      <h3>Recent Uploads</h3>
//
//      {loading && <p>Loading...</p>}
//
//      {!loading && history.length === 0 && (
//        <p>No uploads yet</p>
//      )}
//
//      {history.map((item, index) => (
//        <div key={index} className="history-item">
//          <p><strong>{item.filename}</strong></p>
//
//          <small>
//            {new Date(item.uploaded_at).toLocaleString()}
//          </small>
//
//          <br />
//
//          {item.pdf && (
//          <button>
//            <a
//              href={`http://127.0.0.1:8000/media/${item.pdf}`}
//              target="_blank"
//              rel="noreferrer"
//            >
//              View PDF
//            </a>
//            </button>
//          )}
//
//          <hr />
//        </div>
//      ))}
//    </div>
//  );
//}
//
//export default History;
//

import React, { useEffect, useState } from "react";
import { getHistory } from "../api/api";
import { downloadPDF } from "../api/api";

function History() {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();

      if (Array.isArray(data)) {
        // ensure latest 5 only
        setHistory(data.slice(0, 5));
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
      setHistory([]);
    }
  };

  useEffect(() => {
    // initial load
    fetchHistory();

    // 🔥 refresh when upload finishes
    const refreshHandler = () => fetchHistory();
    window.addEventListener("refresh-history", refreshHandler);

    return () => {
      window.removeEventListener("refresh-history", refreshHandler);
    };
  }, []);

  /* ❗❗ DO NOT TOUCH BELOW THIS LINE ❗❗ */
  /* keep your existing HTML/JSX exactly as it was */

  return (
    <div className="card">
      <h2>History</h2>
      <ul>
        {history.map((item) => (
          <li key={item.id}>
            {item.filename} - {new Date(item.uploaded_at).toLocaleString()} &nbsp;
            <button onClick={() => downloadPDF(item.pdf)}>View PDF</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
