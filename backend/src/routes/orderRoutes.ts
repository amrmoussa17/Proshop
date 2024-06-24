import { Router } from "express"
import { admin, protect } from "../middleware/auth"
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController"

const router = Router()

router.route("/").post(protect, createOrder).get(protect, admin, getAllOrders)
router.route("/mine").get(protect, getMyOrders)
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)
router.route("/:id/deliver").put(protect, updateOrderToDelivered)

export default router
