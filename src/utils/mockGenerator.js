import bcrypt from "bcrypt"

const firstNames = ["Juan", "María", "Carlos", "Ana", "Luis", "Carmen", "José", "Isabel", "Antonio", "Pilar"]
const lastNames = [
  "García",
  "Rodríguez",
  "González",
  "Fernández",
  "López",
  "Martínez",
  "Sánchez",
  "Pérez",
  "Gómez",
  "Martín",
]
const petNames = ["Max", "Bella", "Charlie", "Luna", "Cooper", "Lucy", "Rocky", "Daisy", "Buddy", "Molly"]
const species = ["dog", "cat", "bird", "rabbit"]

export const generateMockUsers = (count = 50) => {
  const users = []
  const hashedPassword = bcrypt.hashSync("coder123", 10)

  for (let i = 0; i < count; i++) {
    users.push({
      first_name: firstNames[Math.floor(Math.random() * firstNames.length)],
      last_name: lastNames[Math.floor(Math.random() * lastNames.length)],
      email: `user${i + 1}@test.com`,
      password: hashedPassword,
      role: Math.random() > 0.5 ? "user" : "admin",
      pets: [],
    })
  }

  return users
}

export const generateMockPets = (count = 100) => {
  const pets = []

  for (let i = 0; i < count; i++) {
    const birthDate = new Date()
    birthDate.setFullYear(birthDate.getFullYear() - Math.floor(Math.random() * 10))

    pets.push({
      name: petNames[Math.floor(Math.random() * petNames.length)],
      specie: species[Math.floor(Math.random() * species.length)],
      birthDate,
      adopted: false,
      owner: null,
      image: `https://picsum.photos/300/300?random=${i}`,
    })
  }

  return pets
}
