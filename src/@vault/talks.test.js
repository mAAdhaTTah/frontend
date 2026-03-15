import { compileTalk } from './talks.js';

jest.mock('./server.js', () => ({
  compileSlide: jest.fn(source =>
    Promise.resolve({ content: source, frontmatter: {} }),
  ),
}));

const withFrontmatter = body => `---\ntitle: Test\n---\n${body}`;

describe('compileTalk', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('splits on --- separators into individual slides', async () => {
    const source = withFrontmatter(`
# Slide 1

---

# Slide 2

---

# Slide 3
`);
    const slides = await compileTalk(source);
    expect(slides).toHaveLength(3);
  });

  it('filters out empty segments before the first separator', async () => {
    const source = withFrontmatter(`
---

# First Real Slide
`);
    const slides = await compileTalk(source);
    expect(slides).toHaveLength(1);
  });

  it('does not split on --- inside fenced code blocks', async () => {
    const source = withFrontmatter(`
# Slide with Code

\`\`\`yaml
---
name: example
---
\`\`\`
`);
    const slides = await compileTalk(source);
    expect(slides).toHaveLength(1);
  });

  it('does not split on --- inside tilde-fenced code blocks', async () => {
    const source = withFrontmatter(`
# Slide with Code

~~~yaml
---
name: example
---
~~~
`);
    const slides = await compileTalk(source);
    expect(slides).toHaveLength(1);
  });

  it('compiles each slide in parallel via compileSlide()', async () => {
    const { compileSlide } = await import('./server.js');
    const source = withFrontmatter(`
# Slide 1

---

# Slide 2
`);
    await compileTalk(source);
    expect(compileSlide).toHaveBeenCalledTimes(2);
  });
});
