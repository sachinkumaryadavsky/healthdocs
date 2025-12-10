import { useEffect, useState } from "react";
import { api } from "../services/api";

interface Document {
  id: number;
  filename: string;
  filepath: string;
  filesize: number;
  created_at: string;
}

interface DocumentListProps {
  refreshFlag: number;
}

function DocumentList({ refreshFlag }: DocumentListProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [message, setMessage] = useState("");

  const fetchDocuments = async () => {
    try {
      const res = await api.get("/documents");
      setDocuments(res.data.data || []);
    } catch (error) {
      console.error(error);
      setMessage(" Failed to load documents");

      setTimeout(() => setMessage(""), 2000);
    }
  };

  //  THIS RUNS:
  //  On PAGE REFRESH
  //  On FIRST LOAD
  //  After UPLOAD (refreshFlag changes)
  useEffect(() => {
  const loadDocuments = async () => {
    await fetchDocuments();
  };

  loadDocuments();
}, [refreshFlag]);


  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/documents/${id}`);
      setMessage(" Document deleted");

      await fetchDocuments();

      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error(error);
      setMessage(" Delete failed");

      setTimeout(() => setMessage(""), 2000);
    }
  };

  const handleDownload = (id: number) => {
    window.open(`http://localhost:3000/api/documents/${id}`);
  };

  return (
  <div>
    <h3 style={{ marginBottom: "15px" }}>📁 Uploaded Documents</h3>

    {message && (
      <p style={{ marginBottom: "10px", fontWeight: "bold" }}>{message}</p>
    )}

    {documents.length === 0 ? (
      <p style={{ color: "#777" }}>No documents uploaded yet.</p>
    ) : (
      <ul style={{ listStyle: "none", padding: 0 }}>
        {documents.map((doc) => (
          <li
            key={doc.id}
            style={{
              padding: "12px",
              background: "#f9fafb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "6px",
              marginBottom: "10px",
            }}
          >
            <span style={{ fontWeight: 500 }}>{doc.filename}</span>

            <div>
              <button
                onClick={() => handleDownload(doc.id)}
                style={{
                  marginRight: "10px",
                  padding: "6px 12px",
                  background: "#2e7d32",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Download
              </button>

              <button
                onClick={() => handleDelete(doc.id)}
                style={{
                  padding: "6px 12px",
                  background: "#d32f2f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

}

export default DocumentList;
