import { defineConfig } from 'tinacms';
import { server } from '../src/@app/config';
import { HOME_SLUG, IGNORED_SLUGS } from '../src/@tina/routes';
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

const branch =
  /* process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || */ 'main';

export default defineConfig({
  branch,
  clientId: server.TINA_CLIENT_ID,
  token: server.TINA_TOKEN,
  schema: {
    collections: [
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
  cmsCallback: cms => {
    //  add your CMS callback code here (if you want)

    // The Route Mapper
    /**
     * 1. Import `tinacms` and `RouteMappingPlugin`
     **/
    import('tinacms').then(({ RouteMappingPlugin }) => {
      /**
       * 2. Define the `RouteMappingPlugin` see https://tina.io/docs/tinacms-context/#the-routemappingplugin for more details
       **/
      const RouteMapping = new RouteMappingPlugin((collection, document) => {
        switch (collection.name) {
          case 'page':
            const slug = document._sys.filename;
            if (IGNORED_SLUGS.includes(slug)) return;
            return slug !== HOME_SLUG ? `/${document._sys.filename}` : '/';
          default:
            return;
        }
      });
      /**
       * 3. Add the `RouteMappingPlugin` to the `cms`.
       **/
      cms.plugins.add(RouteMapping);
    });

    return cms;
  },
  media: {
    async loadCustomStore() {
      const { S3MediaStore } = await import('./MediaStore');
      return S3MediaStore;
    },
  },
});
