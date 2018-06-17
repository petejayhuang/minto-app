const express = require("express")
var bodyParser = require("body-parser")

const uuid = require("uuid/v1")
const AWS = require("aws-sdk")
// const keys = require('./config/keys')

// get all s3 functionality from library

const s3 = new AWS.S3({
  accessKeyId: "AKIAIKFT6IEBSN7KHXRQ",
  secretAccessKey: "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",
  signatureVersion: "v4",
  region: "eu-west-2"
})

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post("/api/upload", (req, res) => {
  const user = "petejayhuang"

  const getSignedUrlPromise = ({ imageName, params, key }) => {
    return new Promise((resolve, reject) => {
      try {
        s3.getSignedUrl("putObject", params, (error, url) => {
          resolve({ imageName, key, url })
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  const arrayOfPromises = req.body.images.map(imageName => {
    const key = `${user}/${uuid()}.png`
    const params = {
      Bucket: "jwl-public",
      ContentType: "image/png",
      Key: key
    }

    return getSignedUrlPromise({ imageName, params, key })
  })

  Promise.all(arrayOfPromises).then(values => {
    res.send(values)
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
