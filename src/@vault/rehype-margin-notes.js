/**
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').ElementContent} ElementContent
 * @typedef {import('hast').Root} Root
 */

/** @type {(node: unknown, tagName: string) => node is Element} */
const isElement = (node, tagName) =>
  typeof node === 'object' &&
  node !== null &&
  /** @type {Element} */ (node).type === 'element' &&
  /** @type {Element} */ (node).tagName === tagName;

/** Hast nodes are plain JSON, and jsdom lacks `structuredClone` under Jest.
 * @type {<T>(nodes: T) => T} */
const clone = nodes => JSON.parse(JSON.stringify(nodes));

/** @type {(node: ElementContent) => boolean} */
const isBlankText = node => node.type === 'text' && node.value.trim() === '';

/**
 * Phrasing content markdown can produce. The copy is spliced into the article's
 * `<p>`, and the parser closes a `<p>` at the first block-level start tag inside
 * it, restructuring the DOM out from under React.
 *
 * `img` is excluded despite being phrasing content: MDX maps it to
 * `ServerEmbed`, which can render a whole tweet card.
 */
const PHRASING = new Set([
  'a',
  'abbr',
  'b',
  'bdi',
  'bdo',
  'br',
  'cite',
  'code',
  'data',
  'del',
  'dfn',
  'em',
  'i',
  'input',
  'ins',
  'kbd',
  'mark',
  'picture',
  'q',
  'ruby',
  's',
  'samp',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'time',
  'u',
  'var',
  'wbr',
]);

/**
 * `unist-util-visit` in miniature, to avoid promoting a transitive package to a
 * direct dependency. Recurses through every node with children, not just
 * elements, so a footnote inside an MDX component is still found. The visitor
 * returns how many nodes it spliced in so the walk skips them.
 *
 * @type {(
 *  node: unknown,
 *  visit: (node: Element, index: number, parent: any) => number | void,
 * ) => void}
 */
const eachElement = (node, visit) => {
  const children = /** @type {{ children?: unknown[] }} */ (node)?.children;
  if (!Array.isArray(children)) return;

  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (/** @type {{ type?: string }} */ (child)?.type === 'element') {
      index += visit(/** @type {Element} */ (child), index, node) ?? 0;
    }
    eachElement(child, visit);
  }
};

/**
 * Collects the footnote sections and, per section, the `<li>` bodies keyed by
 * id. The sections are left alone until we know whether every note in them made
 * it into the margin.
 *
 * @type {(tree: Root) => { section: Element, notes: Record<string, ElementContent[]> }[]}
 */
const collectSections = tree => {
  /** @type {{ section: Element, notes: Record<string, ElementContent[]> }[]} */
  const sections = [];

  eachElement(tree, node => {
    if (node.tagName !== 'section' || !node.properties.dataFootnotes) return;

    /** @type {Record<string, ElementContent[]>} */
    const notes = {};
    eachElement(node, item => {
      if (item.tagName === 'li' && typeof item.properties.id === 'string') {
        notes[item.properties.id] = item.children;
      }
    });
    sections.push({ section: node, notes });
  });

  return sections;
};

/**
 * Node types safe inside a `<p>`; `element` is checked against `PHRASING`
 * instead. `raw` and every MDX node are rejected — a JSX tag name says nothing
 * about what it renders, and `RecentEssays` in a note body is a `<ul>`.
 */
const PHRASING_TYPES = new Set(['text', 'comment']);

/** @type {(node: ElementContent) => boolean} */
const isPhrasing = node =>
  node.type === 'element'
    ? PHRASING.has(node.tagName) && node.children.every(isPhrasing)
    : PHRASING_TYPES.has(node.type);

/**
 * A focusable element inside an `aria-hidden` subtree is an accessibility
 * violation, but the copy is the note's only visible rendering once the real
 * section is clipped, so its links must stay clickable and selectable.
 * `tabIndex: -1` drops the tab stop; `inert` would drop those too.
 *
 * @type {(node: ElementContent) => void}
 */
const deactivateLinks = node => {
  if (node.type !== 'element') return;
  if (node.tagName === 'a') node.properties.tabIndex = -1;
  node.children.forEach(deactivateLinks);
};

/**
 * Turns a footnote `<li>` body into content legal inside the article's `<p>`:
 * wrapping `<p>`s are unwrapped, consecutive ones joined by a `<br>`, and the
 * `↩` backref dropped, since the copy has nowhere to go back to.
 *
 * Returns `null` if the body holds anything that is not phrasing content.
 *
 * @type {(children: ElementContent[]) => ElementContent[] | null}
 */
const toMarginBody = children => {
  /** @type {ElementContent[]} */
  const body = [];

  // Validate before cloning, never up front: an MDX expression carries an
  // `estree` in `data`, which is not plain JSON and can throw on deep copy.
  for (const child of children) {
    if (isBlankText(child)) continue;
    if (!isElement(child, 'p') && !isPhrasing(child)) return null;

    if (body.length > 0) {
      body.push({
        type: 'element',
        tagName: 'br',
        properties: {},
        children: [],
      });
    }

    for (const node of isElement(child, 'p') ? child.children : [child]) {
      if (!isPhrasing(node)) return null;
      // The backref's value is the empty string, so test for the key itself.
      if (node.type === 'element' && 'dataFootnoteBackref' in node.properties) {
        continue;
      }
      if (body.length === 0 && isBlankText(node)) continue;
      body.push(clone(node));
    }
  }

  // Dropping the backref leaves the space that separated it from the text.
  while (body.length > 0) {
    const last = body[body.length - 1];
    if (isBlankText(last) || isElement(last, 'br')) {
      body.pop();
      continue;
    }
    if (last.type === 'text') last.value = last.value.replace(/\s+$/, '');
    break;
  }

  body.forEach(deactivateLinks);

  return body;
};

/**
 * Splices a decorative copy of every footnote in next to its reference so CSS
 * can float it into the right margin, Tufte-style. The copy carries no ids and
 * is `aria-hidden`, leaving `<section data-footnotes>` the single copy in the
 * accessibility tree and the narrow-screen fallback.
 *
 * A section whose notes all made it into the margin is stamped
 * `data-margin-notes="all"`, which is what the CSS keys the clipping off.
 * Clipping a section holding a refused note would leave it with no visual
 * representation at all, so that section stays visible instead.
 *
 * @type {() => (tree: Root) => void}
 */
export const rehypeMarginNotes = () => tree => {
  const sections = collectSections(tree);
  if (sections.length === 0) return;

  /** @type {Record<string, ElementContent[]>} */
  const notes = Object.assign({}, ...sections.map(({ notes }) => notes));
  if (Object.keys(notes).length === 0) return;

  /** One note, one margin copy: a footnote referenced twice would otherwise
   * stack two identical notes. Later references stay plain superscripts. */
  const spliced = new Set();

  eachElement(tree, (node, index, parent) => {
    if (node.tagName !== 'sup') return;

    const ref = node.children.find(
      child => child.type === 'element' && child.properties.dataFootnoteRef,
    );
    if (!isElement(ref, 'a') || typeof ref.properties.href !== 'string') return;

    const id = ref.properties.href.replace(/^#/, '');
    if (spliced.has(id)) return;

    const note = notes[id];
    if (!note) return;

    const body = toMarginBody(note);
    if (!body) return;

    spliced.add(id);

    parent.children.splice(index + 1, 0, {
      type: 'element',
      tagName: 'span',
      properties: { className: ['margin-note'], ariaHidden: 'true' },
      children: [
        {
          type: 'element',
          tagName: 'span',
          properties: { className: ['margin-note-number'] },
          children: clone(ref.children),
        },
        { type: 'text', value: ' ' },
        ...body,
      ],
    });

    return 1;
  });

  for (const { section, notes } of sections) {
    const ids = Object.keys(notes);
    if (ids.length > 0 && ids.every(id => spliced.has(id))) {
      section.properties.dataMarginNotes = 'all';
    }
  }
};
