const axios = require('axios').default;
const { logger } = require('./logger');
const { startServer } = require('./start-server');

const freshMigration = async () => {
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
