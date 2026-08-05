import { rehypeMarginNotes } from './rehype-margin-notes';

const el = (tagName, properties, children = []) => ({
  type: 'element',
  tagName,
  properties,
  children,
});

const text = value => ({ type: 'text', value });

/** The shape remark-gfm produces for `Body.[^1]` plus its definition. */
const fixture = () => ({
  type: 'root',
  children: [
    el('p', {}, [
      text('Body.'),
      el('sup', {}, [
        el(
          'a',
          {
            href: '#user-content-fn-1',
            id: 'user-content-fnref-1',
            dataFootnoteRef: true,
            ariaDescribedBy: 'footnote-label',
          },
          [text('1')],
        ),
      ]),
      text(' More body.'),
    ]),
    el('section', { dataFootnotes: true, className: ['footnotes'] }, [
      el('h2', { id: 'footnote-label' }, [text('Footnotes')]),
      el('ol', {}, [
        el('li', { id: 'user-content-fn-1' }, [
          text('\n'),
          el('p', {}, [
            text('The note with a '),
            el('a', { href: 'https://example.com' }, [text('link')]),
            text('. '),
            el(
              'a',
              {
                href: '#user-content-fnref-1',
                dataFootnoteBackref: '',
                className: ['data-footnote-backref'],
              },
              [text('↩')],
            ),
          ]),
          text('\n'),
        ]),
      ]),
    ]),
  ],
});

const run = tree => {
  rehypeMarginNotes()(tree);
  return tree;
};

const flatten = node =>
  node.type === 'text'
    ? node.value
    : (node.children ?? []).map(flatten).join('');

describe('rehypeMarginNotes', () => {
  it('splices a decorative copy in right after the reference', () => {
    const [paragraph] = run(fixture()).children;

    expect(paragraph.children.map(child => child.tagName)).toEqual([
      undefined,
      'sup',
      'span',
      undefined,
    ]);

    const note = paragraph.children[2];
    expect(note.properties).toEqual({
      className: ['margin-note'],
      ariaHidden: 'true',
    });
    expect(flatten(note)).toBe('1 The note with a link.');
  });

  it('keeps the copied links clickable but out of the tab order', () => {
    const note = run(fixture()).children[0].children[2];
    const link = note.children.find(child => child.tagName === 'a');

    expect(link.properties.href).toBe('https://example.com');
    expect(link.properties.tabIndex).toBe(-1);
  });

  it('repeats the reference number in the margin copy', () => {
    const note = run(fixture()).children[0].children[2];
    const [number] = note.children;

    expect(number.properties.className).toEqual(['margin-note-number']);
    expect(flatten(number)).toBe('1');
  });

  it('unwraps the note body so no <p> nests inside the article <p>', () => {
    const note = run(fixture()).children[0].children[2];

    expect(note.children.some(child => child.tagName === 'p')).toBe(false);
  });

  it('gives the copy no ids and drops the backref', () => {
    const note = run(fixture()).children[0].children[2];
    const ids = [];
    const backrefs = [];
    const walk = node => {
      if (node.properties?.id) ids.push(node.properties.id);
      if (node.properties && 'dataFootnoteBackref' in node.properties) {
        backrefs.push(node);
      }
      (node.children ?? []).forEach(walk);
    };
    walk(note);

    expect(ids).toEqual([]);
    expect(backrefs).toEqual([]);
  });

  it('leaves the footnotes section intact apart from the marker', () => {
    const tree = fixture();
    const before = JSON.stringify(tree.children[1]);
    run(tree);

    const section = tree.children[1];
    expect(section.properties.dataMarginNotes).toBe('all');
    delete section.properties.dataMarginNotes;
    expect(JSON.stringify(section)).toBe(before);
  });

  it('leaves the section unmarked when a note could not be copied', () => {
    const tree = withNoteBody([el('ul', {}, [el('li', {}, [text('one')])])]);
    run(tree);

    expect('dataMarginNotes' in tree.children[1].properties).toBe(false);
  });

  it('finds references nested inside MDX JSX elements', () => {
    const tree = fixture();
    const [paragraph] = tree.children;
    tree.children[0] = {
      type: 'mdxJsxFlowElement',
      name: 'Callout',
      attributes: [],
      children: [paragraph],
    };
    run(tree);

    const notes = paragraph.children.filter(
      child => child.properties?.className?.[0] === 'margin-note',
    );
    expect(notes).toHaveLength(1);
  });

  /** Replaces the `<li>` body with `children`, keeping the rest of the shape. */
  const withNoteBody = children => {
    const tree = fixture();
    tree.children[1].children[1].children[0].children = children;
    return tree;
  };

  const ref = number =>
    el('sup', {}, [
      el('a', { href: `#user-content-fn-${number}`, dataFootnoteRef: true }, [
        text(String(number)),
      ]),
    ]);

  it('separates multiple paragraphs so the sentences do not run together', () => {
    const tree = withNoteBody([
      el('p', {}, [text('Para one.')]),
      text('\n'),
      el('p', {}, [text('Para two.')]),
    ]);
    const note = run(tree).children[0].children[2];

    expect(note.children.some(child => child.tagName === 'br')).toBe(true);
    expect(flatten(note)).toBe('1 Para one.Para two.');
  });

  it('skips notes whose body is not phrasing content', () => {
    const tree = withNoteBody([
      el('p', {}, [text('Intro.')]),
      el('ul', {}, [el('li', {}, [text('one')])]),
    ]);
    const [paragraph] = run(tree).children;

    expect(paragraph.children.map(child => child.tagName)).toEqual([
      undefined,
      'sup',
      undefined,
    ]);
  });

  it('skips notes holding a block element nested in a paragraph', () => {
    const tree = withNoteBody([
      el('p', {}, [el('pre', {}, [el('code', {}, [text('x')])])]),
    ]);
    const [paragraph] = run(tree).children;

    expect(paragraph.children.some(child => child.tagName === 'span')).toBe(
      false,
    );
  });

  it('skips notes holding an MDX component, which may render a block', () => {
    const tree = withNoteBody([
      {
        type: 'mdxJsxFlowElement',
        name: 'RecentEssays',
        attributes: [],
        children: [],
      },
    ]);
    const [paragraph] = run(tree).children;

    expect(paragraph.children.some(child => child.tagName === 'span')).toBe(
      false,
    );
    expect('dataMarginNotes' in tree.children[1].properties).toBe(false);
  });

  it('splices one copy for a footnote referenced more than once', () => {
    const tree = fixture();
    tree.children[0].children.push(text(' Again'), ref(1), text('.'));
    const [paragraph] = run(tree).children;

    const notes = paragraph.children.filter(
      child => child.properties?.className?.[0] === 'margin-note',
    );
    expect(notes).toHaveLength(1);
    expect(paragraph.children.indexOf(notes[0])).toBe(2);
  });

  it('leaves content without footnotes alone', () => {
    const tree = { type: 'root', children: [el('p', {}, [text('Hello.')])] };
    const before = JSON.stringify(tree);
    run(tree);

    expect(JSON.stringify(tree)).toBe(before);
  });
});
