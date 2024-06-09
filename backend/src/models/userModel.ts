import mongoose, { Document } from "mongoose"
import bcrypt from "bcrypt"

interface UserDocument extends Document {
  name: string
  email: string
  password: string
  isAdmin: boolean
  matchPassword: (password: string) => Promise<boolean>
}
const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model<UserDocument>("User", userSchema)

export default User
