import { promisify } from 'util';
import path from 'path';
import {
  DeleteObjectCommand,
  ListObjectsCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';

const createMediaHandler = config => {
  const s3Client = new S3Client({
    region: config.region,
    endpoint: config.endpoint,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
  return async (req, res) => {
    const isAuthorized = await config.authorized(req, res);
    // make sure the user is authorized to upload
    if (!isAuthorized) {
      res.status(401).json({ message: 'sorry this user is unauthorized' });
      return;
    }
    switch (req.method) {
      case 'GET':
        return listMedia(req, res);
      case 'POST':
        return uploadMedia(req, res);
      case 'DELETE':
        return deleteMedia(req, res);
      default:
        res.end(404);
    }
  };

  async function listMedia(req, res) {
    try {
      const { directory, limit = 500, offset } = req.query;

      const Prefix = directory ? directory + '/' : '';
      const response = await s3Client.send(
        new ListObjectsCommand({
          Bucket: config.bucket,
          Delimiter: '/',
          Marker: offset,
          MaxKeys: limit,
          Prefix,
        }),
      );

      const folders =
        response.CommonPrefixes?.map(({ Prefix }) => ({
          id: Prefix,
          type: 'dir',
          filename: path.basename(Prefix),
          directory: path.dirname(Prefix),
        })) ?? [];
      const files =
        response.Contents?.filter(obj => obj.Key !== Prefix).map(obj => ({
          id: obj.ETag,
          filename: path.basename(obj.Key),
          directory: path.dirname(obj.Key),
          src: `${config.cdnDomain}/${obj.Key}`,
          previewSrc: `${config.cdnDomain}/${obj.Key}`,
          type: 'file',
        })) ?? [];

      res.json({
        items: [...folders, ...files],
        offset: response.NextMarker,
      });
    } catch (e) {
      res.status(500).json({ e: e.message });
    }
  }

  async function uploadMedia(req, res) {
    const upload = promisify(
      multer({
        storage: multerS3({
          s3: s3Client,
          bucket: config.bucket,
          key: function (req, file, cb) {
            cb(null, file.originalname);
          },
        }),
      }).single('file'),
    );

    await upload(req, res);

    res.json(req.file);
  }

  async function deleteMedia(req, res) {
    const { media } = req.query;
    const [, public_id] = media;

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: config.bucket,
        Key: public_id,
      }),
    );
  }
};

export default createMediaHandler({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  bucket: process.env.AWS_BUCKET,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  cdnDomain: process.env.AWS_CDN_DOMAIN,
  authorized: () => true,
});
