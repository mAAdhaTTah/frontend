import { compileSlide } from './server.js';

const SLIDE_SEPARATOR = /^---$/;

/**
 * @typedef {{ content: import('react').ReactElement }} CompiledSlide
 */

/**
 * Compile a talk's raw markdown source into an array of compiled slides.
 *
 * Strips YAML frontmatter, splits on `---` separators (respecting fenced code
 * blocks to avoid misinterpreting `---` inside code examples), and compiles
 * each slide through the MDX pipeline.
 *
 * @param {string} source - Raw markdown including YAML frontmatter
 * @returns {Promise<CompiledSlide[]>}
 */
export const compileTalk = async source => {
  const stripped = source.replace(/^---\s*[\s\S]*?\s*---/, '');

  const rawSlides = [];
  let current = [];
  let inCodeBlock = false;

  for (const line of stripped.split('\n')) {
    if (/^(?:```|~~~)/.test(line)) {
      inCodeBlock = !inCodeBlock;
      current.push(line);
      continue;
    }
    if (!inCodeBlock && SLIDE_SEPARATOR.test(line)) {
      const src = current.join('\n').trim();
      if (src) rawSlides.push(src);
      current = [];
      continue;
    }
    current.push(line);
  }
  const last = current.join('\n').trim();
  if (last) rawSlides.push(last);

  return Promise.all(
    rawSlides.map(async src => {
      const { content } = await compileSlide(src);
      return { content };
    }),
  );
};
