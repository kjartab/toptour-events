// aws_access_key_id = YOUR_ACCESS_KEY_ID
// aws_secret_access_key = YOUR_SECRET_ACCESS_KEY

// var AWS = require('aws-sdk');
// var uuid = require('node-uuid');

// // Create an S3 client
// var s3 = new AWS.S3();

// // var bucketName = 'node-sdk-sample-' + uuid.v4();
// // var keyName = 'hello_world.txt';

// // s3.createBucket({Bucket: bucketName}, function() {
// //   var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
// //   s3.putObject(params, function(err, data) {
// //     if (err)
// //       console.log(err)
// //     else
// //       console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
// //   });
// // });
var events = []

const sendEvent = async (event) => {
    console.log(event)
    events.push(event)
}

const popEvent = () => {
    return events.pop()
}

const getEventsCount = () => {
    return events.length
}

module.exports = {
    sendEvent: sendEvent
}