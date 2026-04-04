import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.ts";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
