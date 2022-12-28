const fs = require('fs/promises');
const puppeteer = require('puppeteer');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');
const Sitemapper = require('sitemapper').default;
const rimraf = require('@alexbinary/rimraf');
const prettier = require('prettier');
const { logger } = require('./logger');
const { freshMigration } = require('./fresh-migration');
const { startServer } = require('./start-server');

const COMPARISON_DIR = 'comparison';
const RESULT = {
  FAILURE: 'FAILURE',
  SUCCESS: 'SUCCESS',
};
const REASON = {
  MIXED_SIZE: 'MIXED_SIZE',
  DIFF: 'DIFF',
  ERROR: 'ERROR',
};

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
 * @param {import('puppeteer').Browser} browser
 * @param {string} imagePath
 * @param {string} url
 */
const takeScreenshot = async (browser, imagePath, url) => {
  const page = await browser.newPage();

  try {
    await page.setViewport({ width: 1200, height: 700 });
    await page.goto(url, {
      waitUntil: 'networkidle0',
    });
    await page.evaluate(() => {
      Array.from(document.images).forEach(function freezeGif(img) {
        if (!img.src.includes('gif')) {
          return;
        }

        const width = img.width,
          height = img.height,
          canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        const freeze = function () {
          try {
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);

            for (let i = 0; i < img.attributes.length; i++) {
              const { name, value } = img.attributes[i];

              if (name !== '"') {
                canvas.setAttribute(name, value);
              }
            }

            canvas.style.position = 'absolute';

            img.parentNode.insertBefore(canvas, img);
            img.style.opacity = '0';
          } catch {}
        };

        if (img.complete) {
          freeze();
        } else {
          img.addEventListener('load', freeze, true);
        }
      });
    });
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("my little web home")',
    );
    await page.screenshot({ path: `${imagePath}.png`, fullPage: true });
    const html = await page.evaluate(
      () => document.body.querySelector('#__next').outerHTML,
    );
    await fs.writeFile(`${imagePath}.html`, html);
    return PNG.sync.read(await fs.readFile(`${imagePath}.png`));
  } finally {
    await page.close().catch(() => {});
  }
};

const getReason = result => {
  switch (result.reason) {
    case REASON.DIFF:
      return 'Diff generated';
    case REASON.ERROR:
      return `Error generating diff: ${result.error.message}. Stack:<br />${result.error.stack}`;
    case REASON.MIXED_SIZE:
      return `Diff not generated due to mixed size. Source: ${result.source.width}x${result.source.height}; Target: ${result.target.width}x${result.target.height}`;
    default:
      throw new Error(`Reason not handled: ${result}`);
  }
};

const generateRow = (result, { source, target }) => `
<tr style="background-color: ${
  result.result === RESULT.SUCCESS ? 'green;color: white' : 'red'
};margin: 0 16px; padding: 10px;">
  <td>${result.path}</td>
  <td>${
    result.result === RESULT.SUCCESS ? 'No differences' : getReason(result)
  }</td>
  <td><a href="${source}/${result.path}" target="_blank">Source Page</a></td>
  <td><a href="${target}/${result.path}" target="_blank">Target Page</a></td>
  <td><a href="./${
    result.path
  }/source.png" target="_blank">Source Screenshot</a></td>
  <td><a href="./${
    result.path
  }/target.png" target="_blank">Target Screenshot</a></td>
  <td><a href="./${result.path}/diff.png" target="_blank">Diff</a></td>
</tr>
`;

const generateHTML = (results, domain) =>
  prettier.format(
    `
<!doctype html>
<html lang="en">
<head>
<title>Comparison Results</title>
</head>
<body>
<table>
<tr>
  <th>Path</th>
  <th>Result</th>
  <th></th>
  <th></th>
  <th></th>
  <th></th>
  <th></th>
</tr>
${results.map(result => generateRow(result, domain)).join('')}
</table>
</body>
</html>`,
    { parser: 'html' },
  );

const compare = async (
  source,
  target,
  { migrate = false, headless = true } = {},
) => {
  let server;

  if (migrate) {
    ({ server } = await freshMigration());
  }

  if (!server && target.includes('localhost')) {
    ({ server } = await startServer());
  }

  logger.info('Setting up repo');
  await rimraf(COMPARISON_DIR);
  await fs.mkdir(COMPARISON_DIR).catch(() => {});

  logger.info('Launching browser');
  const browser = await puppeteer.launch({ headless });

  const results = [];

  try {
    for await (const path of getSitePaths()) {
      try {
        logger.info(`Comparing ${path} on ${source} to ${target}`);
        await fs.mkdir(`${COMPARISON_DIR}/${path}`).catch(() => {});

        const sourceImage = await takeScreenshot(
          browser,
          `${COMPARISON_DIR}/${path}/source`,
          `${source}/${path}`,
        );
        const targetImage = await takeScreenshot(
          browser,
          `${COMPARISON_DIR}/${path}/target`,
          `${target}/${path}`,
        );

        if (
          sourceImage.width !== targetImage.width ||
          sourceImage.height !== targetImage.height
        ) {
          logger.warn(`Image sizes don't match for ${path}. Skipping diff.`);
          results.push({
            path,
            result: RESULT.FAILURE,
            reason: REASON.MIXED_SIZE,
            source: { width: sourceImage.width, height: sourceImage.height },
            target: { width: targetImage.width, height: targetImage.height },
          });
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
          logger.warn(
            `Path ${path} is different by ${pixelsOff} pixels, writing diff.`,
          );
          await fs.writeFile(
            `${COMPARISON_DIR}/${path}/diff.png`,
            PNG.sync.write(diff),
          );
          results.push({
            path,
            result: RESULT.FAILURE,
            reason: REASON.DIFF,
            pixelsOff,
          });
        } else {
          logger.success(`Path ${path} is the same, cleaning up.`);
          await rimraf(`${COMPARISON_DIR}/${path}`);
          results.push({
            result: RESULT.SUCCESS,
            path,
          });
        }
      } catch (error) {
        logger.error(`Failed to complete ${path}.`, error);
        results.push({
          path,
          result: RESULT.FAILURE,
          reason: REASON.ERROR,
          error: {
            message: error.message,
            stack: error.stack,
          },
        });
      } finally {
        await fs.writeFile(
          `${COMPARISON_DIR}/results.html`,
          generateHTML(results, { source, target }),
        );
      }
    }
  } catch (err) {
    logger.fatal('Error occurred', err);
  } finally {
    await browser.close().catch(() => {});
    server?.kill('SIGINT');
  }
};

exports.compare = compare;
