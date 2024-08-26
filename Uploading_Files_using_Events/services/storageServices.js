const AWS = require('aws-sdk');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');
const { localUploadPath, aws, gcp } = require('../config/config');

// AWS S3 setup
const s3 = new AWS.S3({
    accessKeyId: aws.accessKeyId,
    secretAccessKey: aws.secretAccessKey,
    region: aws.region
});

// GCP setup
const gcpStorage = new Storage({
    keyFilename: gcp.keyFilename
});
const gcpBucket = gcpStorage.bucket(gcp.bucketName);

const uploadToLocal = async (file) => {
    const filePath = path.join(localUploadPath, file.filename);
    fs.renameSync(file.path, filePath);
};



const uploadToS3 = async (file) => {
    const fileContent = fs.readFileSync(file.path);
    const params = {
        Bucket: aws.bucketName,
        Key: file.filename,
        Body: fileContent
    };

    await s3.upload(params).promise();
};

const uploadToGCP = async (file) => {
    const filePath = path.join(localUploadPath, file.filename);
    await gcpBucket.upload(filePath, {
        destination: file.filename
    });
};

module.exports = {
    uploadToLocal
    // Uncomment to enable AWS S3 upload
    // uploadToS3,
    // Uncomment to enable GCP upload
    // uploadToGCP
};
