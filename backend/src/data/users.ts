import bcrypt from "bcrypt"

const users = [
  {
    name: "Admin",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Amr",
    email: "amr@email.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Mamdouh",
    email: "mamdouh@email.com",
    password: bcrypt.hashSync("123456", 10),
  },
]

export default users
