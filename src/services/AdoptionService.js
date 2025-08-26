import AdoptionRepository from "../repositories/AdoptionRepository.js"
import PetRepository from "../repositories/PetRepository.js"
import UserRepository from "../repositories/UserRepository.js"

class AdoptionService {
  async createAdoption(adoptionData) {
    // Verify pet exists and is available
    const pet = await PetRepository.findById(adoptionData.pet)
    if (!pet) {
      throw new Error("Pet not found")
    }
    if (pet.adopted) {
      throw new Error("Pet is already adopted")
    }

    // Verify user exists
    const user = await UserRepository.findById(adoptionData.owner)
    if (!user) {
      throw new Error("User not found")
    }

    return await AdoptionRepository.create(adoptionData)
  }

  async getAdoptionById(id) {
    const adoption = await AdoptionRepository.findById(id)
    if (!adoption) {
      throw new Error("Adoption not found")
    }
    return adoption
  }

  async getAllAdoptions() {
    return await AdoptionRepository.findAll()
  }

  async updateAdoption(id, updateData) {
    const adoption = await AdoptionRepository.update(id, updateData)
    if (!adoption) {
      throw new Error("Adoption not found")
    }

    // If adoption is approved, mark pet as adopted
    if (updateData.status === "approved") {
      await PetRepository.update(adoption.pet._id, {
        adopted: true,
        owner: adoption.owner._id,
      })

      // Add pet to user's pets array
      const user = await UserRepository.findById(adoption.owner._id)
      if (!user.pets.includes(adoption.pet._id)) {
        user.pets.push(adoption.pet._id)
        await user.save()
      }
    }

    return adoption
  }

  async deleteAdoption(id) {
    const adoption = await AdoptionRepository.delete(id)
    if (!adoption) {
      throw new Error("Adoption not found")
    }
    return adoption
  }

  async getUserAdoptions(userId) {
    return await AdoptionRepository.findByUser(userId)
  }
}

export default new AdoptionService()
