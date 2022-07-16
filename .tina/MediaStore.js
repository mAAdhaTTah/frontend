import axios from 'axios';

/**
 * @typedef {import('tinacms').Media} Media
 * @typedef {import('tinacms').MediaListOptions} MediaListOptions
 * @typedef {import('tinacms').MediaUploadOptions} MediaUploadOptions
 * @typedef {import('tinacms').MediaStore} MediaStore
 * @implements MediaStore
 */
export class S3MediaStore {
  accept = 'text/*,  application/*, image/*';

  /**
   * @param {MediaUploadOptions[]} files
   * @returns Promise<Media[]>
   */
  async persist(files) {
    /** @type {import('tinacms').Media[]} */
    let uploads = [];

    for (const { file, directory } of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('directory', directory);
      formData.append('filename', file.name);

      const response = await axios.post('/api/s3/media', formData);
      uploads.push(response.data);
    }
    return uploads;
  }

  /**
   * @param {MediaListOptions | undefined} [options]
   * @returns Promise<MediaList>
   */
  async list(options) {
    const response = await axios.get('/api/s3/media', { params: options });
    return response.data;
  }

  /**
   *
   * @param {Media} media
   * @returns Promise<void>
   */
  async delete(media) {
    await axios.delete(`/api/s3/media/${encodeURIComponent(media.id)}`);
  }

  /**
   * @param {string | Media} publicId
   * @returns string
   */
  previewSrc = publicId => {
    if (typeof publicId === 'string') return publicId;
    return publicId.previewSrc;
  };

  parse = img => {
    return img.src;
  };
}
