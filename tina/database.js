import {
  createDatabase,
  createLocalDatabase,
  TinaLevelClient,
} from '@tinacms/datalayer';
import { GitHubProvider } from 'tinacms-gitprovider-github';

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
      databaseAdapter: new TinaLevelClient(),
      namespace: process.env.GITHUB_BRANCH,
    });
