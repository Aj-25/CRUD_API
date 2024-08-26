require('dotenv').config();

module.exports = {
    localUploadPath: 'uploads/',
    aws: {
        bucketName: process.env.AWS_BUCKET_NAME,
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    gcp: {
        bucketName: process.env.GCP_BUCKET_NAME,
        projectId: process.env.GCP_PROJECT_ID,
        keyFilename: process.env.GCP_KEY_FILENAME
    }
};
