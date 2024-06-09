import { Router } from "express"
import productRoutes from "./productRoutes"
import userRoutes from "./userRoutes"

const router = Router()

router.use("/products", productRoutes)
router.use("/users", userRoutes)

export default router
