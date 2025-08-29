import { Router } from "express"
import mongoose from "mongoose"

const router = Router()

/**
 * @openapi
 * /api/sessions/register:
 *   post:
 *     tags:
 *       - Sessions
 *     summary: Register a new user
 *     description: Creates a new user account in the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       409:
 *         description: Conflict - User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.post("/register", (req, res) => {
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

/**
 * @openapi
 * /api/sessions/login:
 *   post:
 *     tags:
 *       - Sessions
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       401:
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 *       400:
 *         description: Bad request - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.post("/login", (req, res) => {
  res.json({ status: "success", message: "Login successful" })
})

/**
 * @openapi
 * /api/sessions/current:
 *   get:
 *     tags:
 *       - Sessions
 *     summary: Get current user
 *     description: Returns the current authenticated user's information
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 payload:
 *                   $ref: '#/components/schemas/UserCurrentDTO'
 *       401:
 *         description: Unauthorized - No active session or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiError'
 */
router.get("/current", (req, res) => {
  res.status(401).json({ status: "error", error: "No active session" })
})

/**
 * @openapi
 * /api/sessions/logout:
 *   post:
 *     tags:
 *       - Sessions
 *     summary: User logout
 *     description: Logs out the current user and invalidates the session
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Logout successful"
 */
router.post("/logout", (req, res) => {
  res.json({ status: "success", message: "Logout successful" })
})

export default router
