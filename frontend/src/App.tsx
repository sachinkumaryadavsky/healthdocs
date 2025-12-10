import { useState } from "react";
import FileUpload from "./components/FileUpload";
import DocumentList from "./components/DocumentList";

function App() {
  const [refreshFlag, setRefreshFlag] = useState(0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: "40px",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          🏥 HealthDocs
        </h1>

        <FileUpload onUploadSuccess={() => setRefreshFlag((p) => p + 1)} />
        <hr style={{ margin: "25px 0" }} />
        <DocumentList refreshFlag={refreshFlag} />
      </div>
    </div>
  );
}

export default App;
