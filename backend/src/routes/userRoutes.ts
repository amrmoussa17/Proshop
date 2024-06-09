import { Router } from "express"
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController"

const router = Router()

router.route("/").post(registerUser).get(getUsers)
router.route("/auth").post(authUser)
router.route("/profile").get(getUserProfile).put(updateUserProfile)
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser)

export default router
