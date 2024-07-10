import { Router } from "express"
import productRoutes from "./productRoutes"
import userRoutes from "./userRoutes"
import orderRoutes from "./orderRoutes"
import uploadRoutes from "./uploadRoutes"

const router = Router()

router.use("/products", productRoutes)
router.use("/users", userRoutes)
router.use("/orders", orderRoutes)
router.use("/upload", uploadRoutes)

export default router
