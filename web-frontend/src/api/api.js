const API_BASE = "http://127.0.0.1:8000/api";

export async function uploadCSV(formData) {
    const response = await fetch("http://127.0.0.1:8000/api/upload/", {
        method: "POST",
        body: formData
    });
    return response.json();
}


export async function getSummary() {
    const response = await fetch(`${API_BASE}/summary/`);
    return response.json();
}

export async function getHistory() {
    const response = await fetch(`${API_BASE}/history/`);
    return response.json();
}

export async function downloadPDF(pdfFile) {
    window.open(`http://127.0.0.1:8000/media/${pdfFile}`, "_blank");
}
