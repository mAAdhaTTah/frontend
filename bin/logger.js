const { Signale } = require('signale');

const signale = new Signale({});

const logger = {
  info(msg) {
    signale.info(msg);
  },
  warn(msg) {
    signale.warn(msg);
  },
  error(msg, err) {
    signale.error(msg, err);
  },
  fatal(msg, err) {
    signale.fatal(msg, err);
  },
  success(msg) {
    signale.success(msg);
  },
};

exports.logger = logger;
