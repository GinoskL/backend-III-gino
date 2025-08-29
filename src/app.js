import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { specs, swaggerUi } from "./config/swagger.js"
import { connectDB } from "./config/database.js"

// Import routers
import usersRouter from "./routes/users.router.js"
import petsRouter from "./routes/pets.router.js"
import adoptionsRouter from "./routes/adoptions.router.js"
import mocksRouter from "./routes/mocks.router.js"

// Load environment variables
dotenv.config()

const app = express()

// Connect to database
if (process.env.NODE_ENV !== "test") {
  connectDB()
}

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

// Basic health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Adoptme API is running",
    version: "1.0.0",
  })
})

// API Routes
// app.use("/api/sessions", sessionsRouter)
app.use("/api/users", usersRouter)
app.use("/api/pets", petsRouter)
app.use("/api/adoptions", adoptionsRouter)
app.use("/api/mocks", mocksRouter)

// OpenAPI documentation for Sessions endpoints
/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: User ID
 *           example: "507f1f77bcf86cd799439011"
 *         first_name:
 *           type: string
 *           description: User's first name
 *           example: "Juan"
 *         last_name:
 *           type: string
 *           description: User's last name
 *           example: "Pérez"
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "juan.perez@email.com"
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: User role
 *           example: "user"
 *         pets:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of pet IDs owned by the user
 *           example: []
 *     UserCurrentDTO:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         first_name:
 *           type: string
 *           example: "Juan"
 *         last_name:
 *           type: string
 *           example: "Pérez"
 *         email:
 *           type: string
 *           example: "juan.perez@email.com"
 *         role:
 *           type: string
 *           example: "user"
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *       properties:
 *         first_name:
 *           type: string
 *           description: User's first name
 *           example: "Juan"
 *         last_name:
 *           type: string
 *           description: User's last name
 *           example: "Pérez"
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "juan.perez@email.com"
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *           example: "mySecurePassword123"
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: "juan.perez@email.com"
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *           example: "mySecurePassword123"
 *     TokenResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "success"
 *         access_token:
 *           type: string
 *           description: JWT access token
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJlbWFpbCI6Imp1YW4ucGVyZXpAZW1haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MzQ1NjcwMDAsImV4cCI6MTYzNDY1MzQwMH0.example"
 *         user:
 *           $ref: '#/components/schemas/UserCurrentDTO'
 *     ApiError:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "error"
 *         error:
 *           type: string
 *           description: Error message
 *           example: "Invalid credentials"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    status: "error",
    error: "Internal server error",
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    error: "Route not found",
  })
})

const PORT = process.env.PORT || 8080

// Only start server if this file is run directly (not imported for testing)
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Adoptme API server running on port ${PORT}`)
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`)
  })
}

// Export the app for testing
export default app
