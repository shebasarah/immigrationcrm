import { config } from 'aws-sdk'
const AWSConfig = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
}
config.update(AWSConfig)