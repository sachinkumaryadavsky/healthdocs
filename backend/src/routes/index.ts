import { Router, Request, Response } from "express";
import { downloadDocumentController, uploadDocumentController } from "../controller/documentController";
import { uploadMiddleware } from "../middleware/uploadMiddleware";
const router = Router();


router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "HealthDocs backend is running successfully ",
  });
});
router.post(
  "/documents/upload",
  uploadMiddleware.single("file"),
  uploadDocumentController
);

router.get("/documents/:id", downloadDocumentController);
export default router;
