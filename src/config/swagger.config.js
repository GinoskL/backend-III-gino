import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Adoptme API",
      version: "1.0.0",
      description: "API documentation for Adoptme application",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Development server",
      },
    ],
  },
  apis: [join(__dirname, "../routes/*.js")], // Path to the API files
}

const specs = swaggerJsdoc(options)

export { specs, swaggerUi }
