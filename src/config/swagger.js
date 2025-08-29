import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Adoptme API",
      version: "1.0.0",
      description: "API for pet adoption platform",
      contact: {
        name: "Gino",
        email: "gino@adoptme.com",
      },
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://your-production-url.com"
            : `http://localhost:${process.env.PORT || 8080}`,
        description: process.env.NODE_ENV === "production" ? "Production server" : "Development server",
      },
    ],
    tags: [
      {
        name: "Users",
        description: "User management endpoints",
      },
      {
        name: "Pets",
        description: "Pet management endpoints",
      },
      {
        name: "Adoptions",
        description: "Adoption management endpoints",
      },
      {
        name: "Mocks",
        description: "Mock data generation endpoints",
      },
      {
        name: "Sessions",
        description: "Authentication and session management endpoints",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/app.js"],
}

const specs = swaggerJSDoc(options)

export { specs, swaggerUi }
