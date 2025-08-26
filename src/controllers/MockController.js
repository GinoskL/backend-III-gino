import UserService from "../services/UserService.js"
import PetService from "../services/PetService.js"

class MockController {
  async getMockingPets(req, res) {
    try {
      const mockPets = await PetService.generateMockPets(100)
      res.json({
        status: "success",
        payload: mockPets,
      })
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: error.message,
      })
    }
  }

  async getMockingUsers(req, res) {
    try {
      const mockUsers = await UserService.generateMockUsers(50)
      res.json({
        status: "success",
        payload: mockUsers,
      })
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: error.message,
      })
    }
  }

  async generateData(req, res) {
    try {
      const { users = 0, pets = 0 } = req.body

      const results = {}

      if (users > 0) {
        results.users = await UserService.generateMockUsers(Number.parseInt(users))
      }

      if (pets > 0) {
        results.pets = await PetService.generateMockPets(Number.parseInt(pets))
      }

      res.json({
        status: "success",
        payload: results,
        message: `Generated ${users} users and ${pets} pets successfully`,
      })
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: error.message,
      })
    }
  }
}

export default new MockController()
