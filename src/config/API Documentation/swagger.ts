import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "A simple Authentication Server API Documentation",
      version: "1.0",
    },
    server: {},
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function generateSwaggerDocs(app: Express, port: number) {
  // Swagger documentation page
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // API Documentation in JSON format
  app.get("/api-docs.json/", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(swaggerSpec);
  });
}

export default generateSwaggerDocs;
