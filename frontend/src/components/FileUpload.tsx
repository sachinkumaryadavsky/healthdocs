import { useRef, useState } from "react";
import { api } from "../services/api";

interface FileUploadProps {
  onUploadSuccess: () => void;
}

function FileUpload({ onUploadSuccess }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  //  Ref to control file input directly
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/documents/upload", formData);

      setMessage(" File uploaded successfully");
      onUploadSuccess();

      setFile(null);
      setTimeout(() => {
        setMessage("");}, 5000);
  

      //  THIS LINE CLEARS THE FILE INPUT UI
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      setMessage("Upload failed");
    }
  };

 return (
  <div style={{ marginBottom: "20px" }}>
    <h3 style={{ marginBottom: "10px" }}>📤 Upload PDF</h3>

    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
      />

      <button
        onClick={handleUpload}
        style={{
          padding: "8px 14px",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Upload
      </button>
    </div>

    {message && (
      <p
  style={{
    marginTop: "10px",
    fontWeight: "bold",
    minHeight: "20px",   
    visibility: message ? "visible" : "hidden",
  }}
>
  {message}
</p>

    )}
  </div>
);

}

export default FileUpload;
