import { createDatabase, createLocalDatabase } from '@tinacms/datalayer';
import { GitHubProvider } from 'tinacms-gitprovider-github';
import { PostgresLevel } from './postgres-level';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        branch: process.env.GITHUB_BRANCH,
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
      }),
      databaseAdapter: new PostgresLevel({
        client: process.env.POSTGRES_URL + "?sslmode=require",
      }),
      namespace: process.env.GITHUB_BRANCH,
    });
