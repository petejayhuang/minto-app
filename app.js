const express = require("express")
const uuid = require("uuid/v1")
const AWS = require("aws-sdk")
const keys = require("./config/keys")

// get all s3 functionality from library
const s3 = new AWS.S3({
  accessKeyId: keys.AWS_ACCESS_KEY_ID,
  secretAccessKey: keys.AWS_ACCESS_KEY_ID,
  signatureVersion: "v4",
  region: "eu-west-2"
})

const app = express()

app.get("/api/upload", (req, res) => {
  console.log("GET /api/upload")
  // TODO - add user in dynamically
  const key = `peter/${uuid()}.png`

  const params = {
    Bucket: "jwl-public",
    ContentType: "image/png",
    Key: key
  }

  s3.getSignedUrl("putObject", params, (error, url) => {
    res.send({ key, url })
  })
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))

  const path = require("path")
  app.get("*", (req, res) => {
    res.sendFile(path, resolve(__dirname, "client", "build", "index.html"))
  })
}

app.listen(process.env.PORT || 8000, () => {
  console.log("Server started")
})
