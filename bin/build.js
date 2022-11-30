const axios = require('axios').default;
const { logger } = require('./logger');
const { startServer } = require('./start-server');

const build = async () => {
  const { server } = await startServer();

  try {
    for (const feed of ['rss2', 'atom', 'json', 'sitemap']) {
      logger.info(`Building feed ${feed}`);
      await axios.get(`http://localhost:3000/api/migrate/feed/${feed}/`);
    }
    logger.success(`Built feeds`);
    server.kill('SIGINT');
  } catch (err) {
    server.kill('SIGINT');
    throw err;
  }
};

exports.build = build;
