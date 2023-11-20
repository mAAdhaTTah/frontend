import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer';
import { TinaAuthJSOptions, AuthJsBackendAuthProvider } from 'tinacms-authjs';
import { databaseClient } from '@tina/db';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

export default TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET,
        }),
      }),
  databaseClient,
});
