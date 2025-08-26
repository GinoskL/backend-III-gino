import Adoption from "../models/Adoption.js"

class AdoptionRepository {
  async create(adoptionData) {
    return await Adoption.create(adoptionData)
  }

  async findById(id) {
    return await Adoption.findById(id).populate("owner").populate("pet")
  }

  async findAll() {
    return await Adoption.find().populate("owner").populate("pet")
  }

  async update(id, updateData) {
    return await Adoption.findByIdAndUpdate(id, updateData, { new: true }).populate("owner").populate("pet")
  }

  async delete(id) {
    return await Adoption.findByIdAndDelete(id)
  }

  async findByUser(userId) {
    return await Adoption.find({ owner: userId }).populate("pet")
  }
}

export default new AdoptionRepository()
