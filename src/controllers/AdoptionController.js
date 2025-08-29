import AdoptionService from "../services/AdoptionService.js"
import mongoose from "mongoose"

class AdoptionController {
  isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id)
  }

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

  async createAdoptionByUserAndPet(req, res) {
    try {
      const { uid, pid } = req.params

      // Validate ObjectId format
      if (!this.isValidObjectId(uid)) {
        return res.status(400).json({
          status: "error",
          error: "Invalid user ID format",
        })
      }

      if (!this.isValidObjectId(pid)) {
        return res.status(400).json({
          status: "error",
          error: "Invalid pet ID format",
        })
      }

      const adoption = await AdoptionService.createAdoptionByUserAndPet(uid, pid)
      res.status(200).json({
        status: "success",
        message: "Pet adopted",
        adoption: adoption,
      })
    } catch (error) {
      if (error.message.includes("not found")) {
        res.status(404).json({
          status: "error",
          error: error.message,
        })
      } else if (error.message.includes("already adopted")) {
        res.status(400).json({
          status: "error",
          error: error.message,
        })
      } else {
        res.status(400).json({
          status: "error",
          error: error.message,
        })
      }
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
      const { aid } = req.params

      if (!this.isValidObjectId(aid)) {
        return res.status(400).json({
          status: "error",
          error: "Invalid adoption ID format",
        })
      }

      const adoption = await AdoptionService.getAdoptionById(aid)
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
