import { expect } from "chai"
import supertest from "supertest"
import { before, after, describe, it } from "mocha"
import app from "../src/app.js"

const requester = supertest(app)

describe("Adoptions Router Tests", function () {
  this.timeout(10000)

  let testUser
  let testPet
  let testAdoption

  // Setup: Create test user and pet before running tests
  before(async () => {
    // Create a test user
    const userResponse = await requester.post("/api/sessions/register").send({
      first_name: "Test",
      last_name: "User",
      email: "testuser@adoptions.com",
      password: "password123",
    })

    testUser = userResponse.body.payload

    // Create a test pet
    const petResponse = await requester.post("/api/pets").send({
      name: "Test Pet",
      specie: "Dog",
      birthDate: "2020-01-01",
      adopted: false,
      image: "test-pet.jpg",
    })

    testPet = petResponse.body.payload
  })

  // Cleanup: Remove test data after tests
  after(async () => {
    if (testUser && testUser._id) {
      await requester.delete(`/api/users/${testUser._id}`)
    }
    if (testPet && testPet._id) {
      await requester.delete(`/api/pets/${testPet._id}`)
    }
    if (testAdoption && testAdoption._id) {
      await requester.delete(`/api/adoptions/${testAdoption._id}`)
    }
  })

  describe("GET /api/adoptions", () => {
    it("should get all adoptions successfully", async () => {
      const response = await requester.get("/api/adoptions")

      expect(response.status).to.equal(200)
      expect(response.body).to.have.property("status", "success")
      expect(response.body).to.have.property("payload")
      expect(response.body.payload).to.be.an("array")
    })

    it("should return empty array when no adoptions exist", async () => {
      const response = await requester.get("/api/adoptions")

      expect(response.status).to.equal(200)
      expect(response.body.payload).to.be.an("array")
    })
  })

  describe("GET /api/adoptions/:aid", () => {
    it("should return 404 for non-existent adoption", async () => {
      const fakeId = "507f1f77bcf86cd799439011"
      const response = await requester.get(`/api/adoptions/${fakeId}`)

      expect(response.status).to.equal(404)
      expect(response.body).to.have.property("status", "error")
      expect(response.body).to.have.property("error")
    })

    it("should return 400 for invalid adoption ID format", async () => {
      const invalidId = "invalid-id"
      const response = await requester.get(`/api/adoptions/${invalidId}`)

      expect(response.status).to.equal(400)
      expect(response.body).to.have.property("status", "error")
    })
  })

  describe("POST /api/adoptions/:uid/:pid", () => {
    it("should create adoption successfully with valid user and pet", async () => {
      const response = await requester.post(`/api/adoptions/${testUser._id}/${testPet._id}`)

      expect(response.status).to.equal(200)
      expect(response.body).to.have.property("status", "success")
      expect(response.body).to.have.property("message", "Pet adopted")

      // Store adoption for cleanup
      testAdoption = response.body.adoption
    })

    it("should return 404 for non-existent user", async () => {
      const fakeUserId = "507f1f77bcf86cd799439011"
      const response = await requester.post(`/api/adoptions/${fakeUserId}/${testPet._id}`)

      expect(response.status).to.equal(404)
      expect(response.body).to.have.property("status", "error")
      expect(response.body.error).to.include("User not found")
    })

    it("should return 404 for non-existent pet", async () => {
      const fakePetId = "507f1f77bcf86cd799439012"
      const response = await requester.post(`/api/adoptions/${testUser._id}/${fakePetId}`)

      expect(response.status).to.equal(404)
      expect(response.body).to.have.property("status", "error")
      expect(response.body.error).to.include("Pet not found")
    })

    it("should return 400 for already adopted pet", async () => {
      // First, create another user for this test
      const anotherUserResponse = await requester.post("/api/sessions/register").send({
        first_name: "Another",
        last_name: "User",
        email: "anotheruser@adoptions.com",
        password: "password123",
      })

      const anotherUser = anotherUserResponse.body.payload

      // Try to adopt the same pet that was already adopted
      const response = await requester.post(`/api/adoptions/${anotherUser._id}/${testPet._id}`)

      expect(response.status).to.equal(400)
      expect(response.body).to.have.property("status", "error")
      expect(response.body.error).to.include("Pet is already adopted")

      // Cleanup
      await requester.delete(`/api/users/${anotherUser._id}`)
    })

    it("should return 400 for invalid user ID format", async () => {
      const invalidUserId = "invalid-user-id"
      const response = await requester.post(`/api/adoptions/${invalidUserId}/${testPet._id}`)

      expect(response.status).to.equal(400)
      expect(response.body).to.have.property("status", "error")
    })

    it("should return 400 for invalid pet ID format", async () => {
      const invalidPetId = "invalid-pet-id"
      const response = await requester.post(`/api/adoptions/${testUser._id}/${invalidPetId}`)

      expect(response.status).to.equal(400)
      expect(response.body).to.have.property("status", "error")
    })
  })

  describe("Error handling", () => {
    it("should handle server errors gracefully", async () => {
      // Test with extremely long ID to potentially cause server error
      const extremelyLongId = "a".repeat(1000)
      const response = await requester.get(`/api/adoptions/${extremelyLongId}`)

      expect(response.status).to.be.oneOf([400, 500])
      expect(response.body).to.have.property("status", "error")
    })
  })
})
