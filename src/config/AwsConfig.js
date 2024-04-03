
import AWS from 'aws-sdk'

// Configure AWS with your credentials
AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_KEY,
    region: process.env.REACT_APP_AWS_S3_REGION,
})

// Create a new S3 instance
export const s3 = new AWS.S3()

export const uploadFileToS3 = async (
    file,
    dynamicPath
)=> {
    const bucketName =
        process.env.REACT_APP_AWS_S3_BUCKET_NAME ?? 'iykons-dev-oja'

    const params = {
        Bucket: bucketName,
        Key: `${dynamicPath}/${Date.now()}-${file.name}`,
        Body: file,
    }

    return await s3.upload(params).promise()
}
