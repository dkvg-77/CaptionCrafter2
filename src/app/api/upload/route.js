// api/upload/route.js

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import uniqid from 'uniqid'

const s3client = new S3Client({
     region: 'ap-south-1',
     credentials: {
          accessKeyId: process.env.dkvg77_AWS_ACCESS_KEY,
          secretAccessKey: process.env.dkvg77_AWS_SECRET_ACCESS_KEY,
     },
});

export async function GET(req) {
     const url = new URL(req.url);
     const searchParams = new URLSearchParams(url.searchParams);
     const ext = searchParams.get('ext');
     const type = searchParams.get('type');

     const id = uniqid();
     const newName = id + '.' + ext;

     const params = {
          Bucket: process.env.dkvg77_AWS_BUCKET,
          Key: newName,
          ContentType: type,
          ACL: 'public-read',
     };

     try {

          const command = new PutObjectCommand(params);
          const presignedurl = await getSignedUrl(s3client, command, { expiresIn: 3600 });
          console.log(presignedurl)

          return Response.json({
               presignedUrl: presignedurl,
               newName: newName,
          })
        
    } catch (error) {
          console.error('Error generating presigned URL:', error);
          return {
               status: 500,
               body: JSON.stringify({ error: 'Failed to generate presigned URL' }),
          };
     }
}
