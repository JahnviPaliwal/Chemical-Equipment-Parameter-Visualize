import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import DataTable from "./components/DataTable";
import SummaryCards from "./components/SummaryCards";
import Charts from "./components/Charts";
import History from "./components/History";
import Sidebar from "./components/Sidebar";
import "./App.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const [tableData, setTableData] = useState([]);
  const [summary, setSummary] = useState({});
  const [pdfFile, setPdfFile] = useState(null);


  const handleDownloadReport = () => {
    const input = document.getElementById("report-section");
        html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("chemical_report.pdf");
    });
  };


  return (
    <div className="container" style={{ marginRight: "500px", transition: "margin-right 0.3s" }}>

      <h1>Chemical Equipment Parameter Visualizer</h1>

      {/* 🔥 Upload FIRST */}
      <UploadForm
        setTableData={setTableData}
        setSummary={setSummary}
      />
      <br></br>



      <div id="report-section">
          {summary && Object.keys(summary).length > 0 && (<SummaryCards summary={summary} />)}
          {Array.isArray(tableData) && tableData.length > 0 && (
            <>
              <Charts data={tableData} />
              <br></br>
              <DataTable data={tableData} />
              <br></br>
              <button onClick={handleDownloadReport}>Download Report</button>
            </>

          )}

      </div>
      {/* Sidebar */}
      <Sidebar>
        <History />
      </Sidebar>
    </div>
  );
}

export default App;
