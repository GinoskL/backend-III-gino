import express from "express"
import mongoose from "mongoose"
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
app.use("/api/users", usersRouter)
app.use("/api/pets", petsRouter)
app.use("/api/adoptions", adoptionsRouter)
app.use("/api/mocks", mocksRouter)

// Sessions routes (keeping as basic implementation for now)
app.post("/api/sessions/register", (req, res) => {
  const { first_name, last_name, email, password } = req.body
  const newUser = {
    _id: new mongoose.Types.ObjectId().toString(),
    first_name,
    last_name,
    email,
    role: "user",
    pets: [],
  }
  res.json({ status: "success", payload: newUser })
})

app.post("/api/sessions/login", (req, res) => {
  res.json({ status: "success", message: "Login successful" })
})

app.get("/api/sessions/current", (req, res) => {
  res.status(401).json({ status: "error", error: "No active session" })
})

app.post("/api/sessions/logout", (req, res) => {
  res.json({ status: "success", message: "Logout successful" })
})

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
