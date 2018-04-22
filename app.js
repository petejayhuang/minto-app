const express = require("express")

const app = express()

app.get("*", (req, res) => {
  res.send("we're up and running")
})

app.listen(process.env.PORT || 8000, () => {
  console.log("Server started")
})
