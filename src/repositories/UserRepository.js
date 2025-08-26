import User from "../models/User.js"

class UserRepository {
  async create(userData) {
    return await User.create(userData)
  }

  async findById(id) {
    return await User.findById(id).populate("pets")
  }

  async findByEmail(email) {
    return await User.findOne({ email })
  }

  async findAll() {
    return await User.find().populate("pets")
  }

  async update(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true }).populate("pets")
  }

  async delete(id) {
    return await User.findByIdAndDelete(id)
  }

  async insertMany(users) {
    return await User.insertMany(users)
  }
}

export default new UserRepository()
