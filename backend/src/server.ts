import express from "express"

const app = express()

app.get("/", (_req, res) => {
  res.json("server is running")
})

const port = 5000
app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})
