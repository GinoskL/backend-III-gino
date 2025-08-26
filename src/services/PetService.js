import PetRepository from "../repositories/PetRepository.js"
import { generateMockPets } from "../utils/mockGenerator.js"

class PetService {
  async createPet(petData) {
    return await PetRepository.create(petData)
  }

  async getPetById(id) {
    const pet = await PetRepository.findById(id)
    if (!pet) {
      throw new Error("Pet not found")
    }
    return pet
  }

  async getAllPets() {
    return await PetRepository.findAll()
  }

  async updatePet(id, updateData) {
    const pet = await PetRepository.update(id, updateData)
    if (!pet) {
      throw new Error("Pet not found")
    }
    return pet
  }

  async deletePet(id) {
    const pet = await PetRepository.delete(id)
    if (!pet) {
      throw new Error("Pet not found")
    }
    return pet
  }

  async getAvailablePets() {
    return await PetRepository.findAvailable()
  }

  async generateMockPets(count = 100) {
    const mockPets = generateMockPets(count)
    return await PetRepository.insertMany(mockPets)
  }
}

export default new PetService()
