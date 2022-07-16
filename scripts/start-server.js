const execa = require('execa');
const waitPort = require('wait-port');
const { logger } = require('./logger');

exports.startServer = async () => {
  logger.info('Starting server');
  const server = execa('npm', ['run', 'dev']);
  try {
    logger.info('Waiting for server to start');
    await waitPort({
      port: 3000,
      output: 'silent',
      timeout: 30000, // 30s
    });
    return { server };
  } catch (err) {
    server.kill('SIGINT');
    throw err;
  }
};
