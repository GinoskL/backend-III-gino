import { Router } from "express"
import AdoptionController from "../controllers/AdoptionController.js"

const router = Router()

router.get("/", AdoptionController.getAdoptions)
router.get("/:aid", AdoptionController.getAdoption)
router.post("/", AdoptionController.createAdoption)
router.put("/:aid", AdoptionController.updateAdoption)
router.delete("/:aid", AdoptionController.deleteAdoption)

export default router
