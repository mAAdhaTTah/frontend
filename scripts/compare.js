const fs = require('fs/promises');
const puppeteer = require('puppeteer');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');
const Sitemapper = require('sitemapper').default;
const rimraf = require('@alexbinary/rimraf');
const execa = require('execa');
const { logger } = require('./logger');
const { freshMigration } = require('./fresh-migration');
const { startServer } = require('./start-server');

const SOURCE_DOMAIN = 'https://jamesdigioia.com';
const TARGET_DOMAIN = 'http://localhost:3000';
const COMPARISON_DIR = 'images';

const sitemap = new Sitemapper({
  url: 'https://backend.jamesdigioia.com/sitemap_index.xml',
});

async function* getSitePaths() {
  const result = await sitemap.fetch();

  if (result.errors.length) {
    logger.error('Error fetching sitemap', result.errors);
    return;
  }

  yield* result.sites.map(site =>
    site
      .replace('https://backend.jamesdigioia.com', '')
      .replace(/^\//, '')
      .replace(/\/$/, ''),
  );
}

/**
 * @param {import('puppeteer').Page} page
 * @param {string} imagePath
 * @param {string} url
 */
const takeScreenshot = async (page, imagePath, url) => {
  await page.goto(url, {
    waitUntil: 'networkidle0',
  });
  await page.waitForFunction(
    'document.querySelector("body").innerText.includes("my little web home")',
  );
  await page.screenshot({ path: imagePath, fullPage: true });
};

const compare = async () => {
  // const { server } = await freshMigration();
  const { server } = await startServer();

  logger.info('Setting up repo');
  await fs.mkdir(COMPARISON_DIR).catch(() => {});

  logger.info('Launching browser');
  const browser = await puppeteer.launch();

  const results = {
    successful: [],
    diffed: [],
    mixedSize: [],
    error: [],
  };

  try {
    for await (const path of getSitePaths()) {
      const page = await browser.newPage();
      try {
        logger.info(
          `Comparing ${path} on ${SOURCE_DOMAIN} to ${TARGET_DOMAIN}`,
        );
        await fs.mkdir(`${COMPARISON_DIR}/${path}`).catch(() => {});

        await page.setViewport({ width: 1200, height: 700 });

        const sourceImagePath = `images/${path}/source.png`;
        await takeScreenshot(page, sourceImagePath, `${SOURCE_DOMAIN}/${path}`);

        const targetImageName = `images/${path}/target.png`;
        await takeScreenshot(page, targetImageName, `${TARGET_DOMAIN}/${path}`);

        const sourceImage = PNG.sync.read(await fs.readFile(sourceImagePath));
        const targetImage = PNG.sync.read(await fs.readFile(targetImageName));

        if (
          sourceImage.width !== targetImage.width ||
          sourceImage.height !== targetImage.height
        ) {
          logger.warn(`Images sizes don't match for ${path}. Skipping diff.`);
          results.mixedSize.push(path);
          continue;
        }

        const { width, height } = sourceImage;
        const diff = new PNG({ width, height });

        const pixelsOff = pixelmatch(
          sourceImage.data,
          targetImage.data,
          diff.data,
          width,
          height,
          {
            threshold: 0.1,
          },
        );

        // LOL 13 pixels in the header image are different
        if (pixelsOff > 15) {
          logger.info(
            `Path ${path} is different by ${pixelsOff} pixels, writing diff.`,
          );
          await fs.writeFile(`images/${path}/diff.png`, PNG.sync.write(diff));
          results.diffed.push(path);
        } else {
          logger.info(`Path ${path} is the same, cleaning up.`);
          await rimraf(`images/${path}`);
          results.successful.push(path);
        }
      } catch (error) {
        logger.error(`Failed to complete ${path}.`, error);
        results.error.push(path);
      } finally {
        await page.close().catch(() => {});
        await fs.writeFile(
          `${COMPARISON_DIR}/results.json`,
          JSON.stringify(results, null, '  '),
        );
      }
    }
  } catch (err) {
    logger.error('Error occurred', err);
  } finally {
    await browser.close().catch(() => {});
    server.kill('SIGINT');
  }
};

exports.compare = compare;

if (require.main === module) {
  compare();
}
