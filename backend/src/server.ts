import express from "express"
import products from "./products"
import dotenv from "dotenv"
import connectDb from "./config/db"

dotenv.config()

connectDb()
const app = express()

app.get("/api/products", (_req, res) => {
  res.json(products)
})
app.get("/api/products/:id", (req, res) => {
  res.json(products.find((p) => p._id === req.params.id))
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})
