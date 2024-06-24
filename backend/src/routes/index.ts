import { Router } from "express"
import productRoutes from "./productRoutes"
import userRoutes from "./userRoutes"
import orderRoutes from "./orderRoutes"

const router = Router()

router.use("/products", productRoutes)
router.use("/users", userRoutes)
router.use("/orders", orderRoutes)

export default router
