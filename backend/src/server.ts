import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db"
import router from "./routes/index"
import { errorHandler, notFound } from "./middleware/errorHandler"

dotenv.config()

connectDb()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", router)
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})
