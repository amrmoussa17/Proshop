import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db"
import router from "./routes/index"

dotenv.config()

connectDb()
const app = express()

app.use("/api", router)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})
