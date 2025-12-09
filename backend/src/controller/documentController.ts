import { Request, Response } from "express";
import { downloadDocumentService, getAllDocumentsService, uploadDocumentService } from "../service/documentService";

export const uploadDocumentController = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const savedDocument = await uploadDocumentService(req.file);

    return res.status(201).json({
      message: "PDF uploaded successfully ",
      document: savedDocument,
    });
  } catch (error: any) {
    console.error("Upload Controller Error:", error);

    return res.status(500).json({
      message: error.message || "Upload failed ",
    });
  }
};



export const downloadDocumentController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({
        message: "Invalid document ID",
      });
    }

    const { filePath, filename } = await downloadDocumentService(id);

    return res.download(filePath, filename);
  } catch (error: any) {
    console.error("Download Error:", error.message);

    return res.status(404).json({
      message: error.message || "Download failed",
    });
  }
};
export const getAllDocumentsController = async (
  req: Request,
  res: Response
) => {
  try {
    const documents = await getAllDocumentsService();

    return res.status(200).json({
      message: "Documents fetched successfully ",
      data:documents,
    });
  } catch (error: any) {
    console.error("Fetch Documents Error:", error);

    return res.status(500).json({
      message: "Failed to fetch documents ",
    });
  }
};
