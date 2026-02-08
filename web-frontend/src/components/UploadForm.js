import React, { useState } from "react";
import { uploadCSV } from "../api/api";

function UploadForm({ setTableData, setSummary }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    console.log("Upload button clicked"); // ✅ ALWAYS runs

    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // 👈 MUST match backend

    const response = await uploadCSV(formData);
    console.log(response);

    setTableData(response.data || []);
    setSummary(response.summary || {});
    window.dispatchEvent(new Event("refresh-history"));

//    try {
//      const response = await uploadCSV(formData);
//
//      console.log("Response:", response); // ✅ debug backend
//
//      setTableData(response?.data?.data || []);
//      setSummary(response?.data?.summary || {});
//    } catch (err) {
//      console.error("Upload failed:", err);
//      alert("Upload failed. Check backend.");
//    }
  };

  return (
    <div className="card">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          console.log("Selected file:", e.target.files[0]);
          setFile(e.target.files[0]);
        }}
      />

      <button type="button" onClick={handleUpload}>
        Analyze
      </button>
    </div>
  );
}

export default UploadForm;
