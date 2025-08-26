import { Router } from "express"
import PetController from "../controllers/PetController.js"

const router = Router()

router.get("/", PetController.getPets)
router.get("/:pid", PetController.getPet)
router.post("/", PetController.createPet)
router.put("/:pid", PetController.updatePet)
router.delete("/:pid", PetController.deletePet)

export default router
