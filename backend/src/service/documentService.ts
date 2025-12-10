import { saveDocumentToDB  ,getDocumentByIdFromDB, getAllDocumentsFromDB, deleteDocumentById } from "../persistance/documentRepo";

import fs from "fs";
import path from "path";


export const uploadDocumentService = async (file: Express.Multer.File) => {
  if (!file) {
    throw new Error("No file provided");
  }

  const savedDoc = await saveDocumentToDB({
    filename: file.originalname,
    filepath: file.path,
    filesize: file.size,
  });

  return savedDoc;
};

export const downloadDocumentService = async (id: number) => {
  const document = await getDocumentByIdFromDB(id);

  if (!document) {
    throw new Error("Document not found");
  }

  
  const filePath = path.resolve(document.filepath);

  if (!fs.existsSync(filePath)) {
    throw new Error("File not found on server");
  }

  return {
    filePath,
    filename: document.filename,
  };
};
export const getAllDocumentsService = async () => {
  const documents = await getAllDocumentsFromDB();
  return documents;
};

export const deleteDocumentService = async (id: number) => {
  const doc = await getDocumentByIdFromDB(id);

  if (!doc) {
    return null;
  }

  
  if (fs.existsSync(doc.filepath)) {
    fs.unlinkSync(doc.filepath);
  }
  await deleteDocumentById(id);

  return doc;
};