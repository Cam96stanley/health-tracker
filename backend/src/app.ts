import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import errorHandler from "./middleware/errorHandler.ts";
import userRoutes from "./routes/user.routes.ts";
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

// Routes

app.use("/api/v1/users", userRoutes);

app.use(errorHandler);

export default app;
