import { AppDataSource } from "./db";
import { Document } from "./entities/document";

export const DocumentRepository = AppDataSource.getRepository(Document);

export const saveDocumentToDB = async (data: {
  filename: string;
  filepath: string;
  filesize: number;
}) => {
  const newDoc = DocumentRepository.create({
    filename: data.filename,
    filepath: data.filepath,
    filesize: data.filesize,
  });

  return await DocumentRepository.save(newDoc);
};
export const getDocumentByIdFromDB = async (id: number) => {
  return await DocumentRepository.findOneBy({ id });
};
