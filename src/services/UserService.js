import UserRepository from "../repositories/UserRepository.js"
import { generateMockUsers } from "../utils/mockGenerator.js"

class UserService {
  async createUser(userData) {
    const existingUser = await UserRepository.findByEmail(userData.email)
    if (existingUser) {
      throw new Error("User already exists with this email")
    }
    return await UserRepository.create(userData)
  }

  async getUserById(id) {
    const user = await UserRepository.findById(id)
    if (!user) {
      throw new Error("User not found")
    }
    return user
  }

  async getAllUsers() {
    return await UserRepository.findAll()
  }

  async updateUser(id, updateData) {
    const user = await UserRepository.update(id, updateData)
    if (!user) {
      throw new Error("User not found")
    }
    return user
  }

  async deleteUser(id) {
    const user = await UserRepository.delete(id)
    if (!user) {
      throw new Error("User not found")
    }
    return user
  }

  async generateMockUsers(count = 50) {
    const mockUsers = generateMockUsers(count)
    return await UserRepository.insertMany(mockUsers)
  }
}

export default new UserService()
