const rimraf = require('@alexbinary/rimraf');
const axios = require('axios').default;
const { logger } = require('./logger');
const { startServer } = require('./start-server');

const freshMigration = async () => {
  logger.info('Cleaning up content');
  await Promise.all([
    rimraf('content/categories'),
    rimraf('content/comments'),
    rimraf('content/media'),
    rimraf('content/posts'),
    rimraf('content/repos'),
    rimraf('content/tags'),
  ]);

  const { server } = await startServer();

  try {
    logger.info('Migrating content');
    await axios.get('http://localhost:3000/api/migrate/wordpress/');

    return { server };
  } catch (err) {
    server.kill('SIGINT');
    throw err;
  }
};

exports.freshMigration = freshMigration;

if (require.main === module) {
  freshMigration()
    .then(({ server }) => {
      logger.info('Killing server');
      server.kill('SIGINT');
      process.exit(0);
    })
    .catch(err => {
      logger.error('Migration failed with error', err);
      process.exit(1);
    });
}
