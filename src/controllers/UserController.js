import UserService from "../services/UserService.js"

class UserController {
  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body)
      res.status(201).json({
        status: "success",
        payload: user,
      })
    } catch (error) {
      res.status(400).json({
        status: "error",
        error: error.message,
      })
    }
  }

  async getUsers(req, res) {
    try {
      const users = await UserService.getAllUsers()
      res.json({
        status: "success",
        payload: users,
      })
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: error.message,
      })
    }
  }

  async getUser(req, res) {
    try {
      const user = await UserService.getUserById(req.params.uid)
      res.json({
        status: "success",
        payload: user,
      })
    } catch (error) {
      res.status(404).json({
        status: "error",
        error: error.message,
      })
    }
  }

  async updateUser(req, res) {
    try {
      const user = await UserService.updateUser(req.params.uid, req.body)
      res.json({
        status: "success",
        payload: user,
      })
    } catch (error) {
      res.status(404).json({
        status: "error",
        error: error.message,
      })
    }
  }

  async deleteUser(req, res) {
    try {
      await UserService.deleteUser(req.params.uid)
      res.json({
        status: "success",
        message: "User deleted successfully",
      })
    } catch (error) {
      res.status(404).json({
        status: "error",
        error: error.message,
      })
    }
  }
}

export default new UserController()
