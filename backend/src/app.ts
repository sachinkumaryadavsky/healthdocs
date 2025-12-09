import "reflect-metadata";
import express from "express";
import cors from "cors";
import documentRoutes from "./routes";

import { AppDataSource } from "./persistance/db";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", documentRoutes);

const PORT = Number(process.env.PORT) || 4000;

AppDataSource.initialize()
  .then(() => {
    console.log(" Database connected (MySQL + TypeORM)");

    app.listen(PORT, () => {
      console.log(` HealthDocs backend running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Database connection failed:", err);
  });
