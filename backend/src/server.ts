import path from "path"
import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db"
import router from "./routes/index"
import { errorHandler, notFound } from "./middleware/errorHandler"
import cookieParser from "cookie-parser"

dotenv.config()
connectDb()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api", router)
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
)

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})
