#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { logger } = require('./logger');

yargs(hideBin(process.argv))
  .command(
    'migrate',
    'Migrate content from WordPress to TinaCMS',
    yargs => yargs,
    args => {
      const { freshMigration } = require('./fresh-migration');
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
    },
  )
  .command(
    'compare <source> <target>',
    'Compare all of URLs in the sitemap between source & target',
    yargs =>
      yargs
        .positional('source', {
          description: 'Domain that holds the sitemap & base pages.',
          type: 'string',
          coerce: source => source,
        })
        .positional('target', {
          description: 'Domain that holds the updated pages.',
          type: 'string',
          coerce: target => target,
        })
        .option('migrate', {
          description: 'Whether to run a migration before comparing.',
          type: 'boolean',
          default: false,
        })
        .option('headed', {
          description: 'Whether to run the browser headed',
          type: 'boolean',
          default: false,
        }),
    args => {
      const { compare } = require('./compare');
      compare(args.source, args.target, {
        migrate: args.migrate,
        headless: !args.headed,
      }).catch(err => {
        logger.error('Comparison failed with error', err);
        process.exit(1);
      });
    },
  )
  .command(
    'build',
    'Build dependencies',
    yargs => yargs,
    args => {
      const { build } = require('./build');
      build(args.type).catch(err => {
        logger.error('Build failed with error', err);
        process.exit(1);
      });
    },
  )
  .parse();
