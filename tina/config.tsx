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

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineConfig({
  branch,
  clientId: server.TINA_CLIENT_ID,
  token: server.TINA_TOKEN,
  schema: {
    collections: [
      // @ts-expect-error TS(2322) FIXME: Type '{ name: string; label: string; path: string;... Remove this comment to see the full error message
      categoryCollection,
      // @ts-expect-error TS(2322) FIXME: Type '{ name: string; label: string; path: string;... Remove this comment to see the full error message
      commentCollection,
      // @ts-expect-error TS(2322) FIXME: Type '{ name: string; label: string; path: string;... Remove this comment to see the full error message
      headerCollection,
      // @ts-expect-error TS(2322) FIXME: Type '{ name: string; label: string; path: string;... Remove this comment to see the full error message
      mediaCollection,
      // @ts-expect-error TS(2322) FIXME: Type '{ label: string; name: string; path: string;... Remove this comment to see the full error message
      menuCollection,
      // @ts-expect-error TS(2322) FIXME: Type '{ name: string; label: string; path: string;... Remove this comment to see the full error message
      pageCollection,
      // @ts-expect-error TS(2322) FIXME: Type '{ name: string; label: string; path: string;... Remove this comment to see the full error message
      postCollection,
      // @ts-expect-error TS(2322) FIXME: Type '{ name: string; label: string; path: string;... Remove this comment to see the full error message
      repoCollection,
      // @ts-expect-error TS(2322) FIXME: Type '{ label: string; name: string; path: string;... Remove this comment to see the full error message
      resumeCollection,
      // @ts-expect-error TS(2322) FIXME: Type '{ name: string; label: string; path: string;... Remove this comment to see the full error message
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
});
