import Pet from "../models/Pet.js"

class PetRepository {
  async create(petData) {
    return await Pet.create(petData)
  }

  async findById(id) {
    return await Pet.findById(id).populate("owner")
  }

  async findAll() {
    return await Pet.find().populate("owner")
  }

  async update(id, updateData) {
    return await Pet.findByIdAndUpdate(id, updateData, { new: true }).populate("owner")
  }

  async delete(id) {
    return await Pet.findByIdAndDelete(id)
  }

  async insertMany(pets) {
    return await Pet.insertMany(pets)
  }

  async findAvailable() {
    return await Pet.find({ adopted: false })
  }
}

export default new PetRepository()
