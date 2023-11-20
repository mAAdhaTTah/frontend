import { defineConfig, LocalAuthProvider } from 'tinacms';
import {
  UsernamePasswordAuthJSProvider,
  TinaUserCollection,
} from 'tinacms-authjs/dist/tinacms';
import {
  categoryCollection,
  commentCollection,
  headerCollection,
  mediaCollection,
  menuCollection,
  pageCollection,
  postCollection,
  repoCollection,
  resumeCollection,
  tagCollection,
} from './collections';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

export default defineConfig({
  contentApiUrlOverride: '/api/tina/gql',
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
  schema: {
    collections: [
      TinaUserCollection,
      categoryCollection,
      commentCollection,
      headerCollection,
      mediaCollection,
      menuCollection,
      pageCollection,
      postCollection,
      repoCollection,
      resumeCollection,
      tagCollection,
    ],
  },
  build: {
    publicFolder: 'public',
    outputFolder: 'admin',
  },
  media: {
    async loadCustomStore() {
      const { S3MediaStore } = await import('./MediaStore');
      return S3MediaStore;
    },
  },
});
