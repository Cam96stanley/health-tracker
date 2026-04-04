import swaggerJsdoc from "swagger-jsdoc";
import env from "./env.ts";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Health Tracker API",
      version: "1.0.0",
      description: "REST API for the Chronic Illness Tracker application",
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}/api/v1`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
