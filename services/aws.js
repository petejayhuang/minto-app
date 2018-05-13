const AWS = require("aws-sdk")

awsConfig = new AWS.config()

awsConfig.update({
  region: "eu-west-2"
})

AWS.config.loadFromPath("./awsConfig.json")

var s3 = new AWS.S3({ apiVersion: "2006-03-01", region: "eu-west-2" })
