import { S3 } from 'aws-sdk'
class S3Singleton {
    static instance = undefined
static async getInstance() {        
        if (S3Singleton.instance) {
            return S3Singleton.instance
        }
        S3Singleton.instance = await S3Singleton.createInstance()
        return S3Singleton.instance
    }
static createInstance = async () => {
        return new S3({
            apiVersion: AWS_API_VERSION,
            region: AWS_REGION,
            params: { Bucket: AWS_BUCKET },
        })
    }
}
export default S3Singleton