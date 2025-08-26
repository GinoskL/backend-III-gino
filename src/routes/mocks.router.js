import { Router } from "express"
import MockController from "../controllers/MockController.js"

const router = Router()

router.get("/mockingpets", MockController.getMockingPets)
router.get("/mockingusers", MockController.getMockingUsers)
router.post("/generateData", MockController.generateData)

export default router
