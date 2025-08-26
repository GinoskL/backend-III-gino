import PetService from "../services/PetService.js"

class PetController {
  async createPet(req, res) {
    try {
      const pet = await PetService.createPet(req.body)
      res.status(201).json({
        status: "success",
        payload: pet,
      })
    } catch (error) {
      res.status(400).json({
        status: "error",
        error: error.message,
      })
    }
  }

  async getPets(req, res) {
    try {
      const pets = await PetService.getAllPets()
      res.json({
        status: "success",
        payload: pets,
      })
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: error.message,
      })
    }
  }

  async getPet(req, res) {
    try {
      const pet = await PetService.getPetById(req.params.pid)
      res.json({
        status: "success",
        payload: pet,
      })
    } catch (error) {
      res.status(404).json({
        status: "error",
        error: error.message,
      })
    }
  }

  async updatePet(req, res) {
    try {
      const pet = await PetService.updatePet(req.params.pid, req.body)
      res.json({
        status: "success",
        payload: pet,
      })
    } catch (error) {
      res.status(404).json({
        status: "error",
        error: error.message,
      })
    }
  }

  async deletePet(req, res) {
    try {
      await PetService.deletePet(req.params.pid)
      res.json({
        status: "success",
        message: "Pet deleted successfully",
      })
    } catch (error) {
      res.status(404).json({
        status: "error",
        error: error.message,
      })
    }
  }
}

export default new PetController()
