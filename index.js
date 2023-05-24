const express = require("express");
const app = express();
const AWS = require("aws-sdk");

// Set the region
AWS.config.update({ region: "us-east-1" });

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

var bucketParams = {
  Bucket: "wahabtestbucket",
};

app.get("/", (req, res) => {
  res.send("Hello worlds");
});

app.get("/listobjects", async (req, res) => {
  // Call S3 to obtain a list of the objects in the bucket
  s3.listObjects(bucketParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      return res.send(data);
    }
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
