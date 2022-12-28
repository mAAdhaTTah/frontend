const execa = require('execa');
const waitPort = require('wait-port');
const { logger } = require('./logger');

exports.startServer = async () => {
  logger.info('Starting server');
  const tina = execa('npx', ['tinacms', 'dev']);
  const next = execa('npx', ['next', 'dev']);
  const server = {
    kill(signal) {
      tina.kill(signal);
      next.kill(signal);
    },
  };
  try {
    logger.info('Waiting for server to start');
    const result1 = await waitPort({
      port: 4001,
      output: 'silent',
      timeout: 60000, // 60s
    });

    if (!result1.open) {
      throw new Error(`Failed to start tina server in 60s`);
    }

    const result2 = await waitPort({
      port: 3000,
      output: 'silent',
      timeout: 60000, // 60s
    });

    if (!result2.open) {
      throw new Error(`Failed to start next server in 60s`);
    }
    return { server };
  } catch (err) {
    server.kill('SIGINT');
    throw err;
  }
};
