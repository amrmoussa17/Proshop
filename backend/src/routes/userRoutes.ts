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
  logoutUser,
} from "../controllers/userController"
import { protect, admin } from "../middleware/auth"

const router = Router()

router.route("/").post(registerUser).get(protect, admin, getUsers)
router.route("/auth").post(authUser)
router.route("/logout").post(logoutUser)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser)

export default router
