import AdoptionService from "../services/AdoptionService.js"

class AdoptionController {
  async createAdoption(req, res) {
    try {
      const adoption = await AdoptionService.createAdoption(req.body)
      res.status(201).json({
        status: "success",
        payload: adoption,
      })
    } catch (error) {
      res.status(400).json({
        status: "error",
        error: error.message,
      })
    }
  }

  async getAdoptions(req, res) {
    try {
      const adoptions = await AdoptionService.getAllAdoptions()
      res.json({
        status: "success",
        payload: adoptions,
      })
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: error.message,
      })
    }
  }

  async getAdoption(req, res) {
    try {
      const adoption = await AdoptionService.getAdoptionById(req.params.aid)
      res.json({
        status: "success",
        payload: adoption,
      })
    } catch (error) {
      res.status(404).json({
        status: "error",
        error: error.message,
      })
    }
  }

  async updateAdoption(req, res) {
    try {
      const adoption = await AdoptionService.updateAdoption(req.params.aid, req.body)
      res.json({
        status: "success",
        payload: adoption,
      })
    } catch (error) {
      res.status(404).json({
        status: "error",
        error: error.message,
      })
    }
  }

  async deleteAdoption(req, res) {
    try {
      await AdoptionService.deleteAdoption(req.params.aid)
      res.json({
        status: "success",
        message: "Adoption deleted successfully",
      })
    } catch (error) {
      res.status(404).json({
        status: "error",
        error: error.message,
      })
    }
  }
}

export default new AdoptionController()
