import { contentToChildren } from './index';

describe('contentToChildren', () => {
  it('should parse nested html', () => {
    const children = contentToChildren(
      `With Tab taking on champion responsibilities now, I've been discussing the proposal with them and the rest of the champion group. While I originally came into the conversation advocating for the F# pipe, <strong>I'm now convinced the Hack pipe is the superior option, and that it would be beneficial <em>to the functional community</em> to embrace it</strong>. At its core, Hack pipe is a better bridge between mainstream & functional JavaScript and makes it easier for mainstream JavaScript to adopt functional patterns.`,
    );

    expect(children).toEqual([
      {
        text: "With Tab taking on champion responsibilities now, I've been discussing the proposal with them and the rest of the champion group. While I originally came into the conversation advocating for the F# pipe, ",
        type: 'text',
      },
      {
        bold: true,
        text: "I'm now convinced the Hack pipe is the superior option, and that it would be beneficial ",
        type: 'text',
      },
      {
        bold: true,
        italic: true,
        text: 'to the functional community',
        type: 'text',
      },
      {
        bold: true,
        text: ' to embrace it',
        type: 'text',
      },
      {
        text: '. At its core, Hack pipe is a better bridge between mainstream & functional JavaScript and makes it easier for mainstream JavaScript to adopt functional patterns.',
        type: 'text',
      },
    ]);
  });

  it('should process link', () => {
    const children = contentToChildren(
      'The Smart-Mix syntax has since evolved into its current Hack iteration, dropping the "bare style" (<code>x |> a.b</code>, without a placeholder) and simplifying its syntax accordingly. Around that time, the previous champion of the proposal, <a href="https://twitter.com/littledan">Daniel Ehrenberg</a>, stepped down and <a href="https://twitter.com/tabatkins">Tab Atkins-Bittner</a> stepped in to take his place. While Daniel favored the F# pipe, Tab favored the Smart pipe previously and the evolved Hack pipe now and as champion, had been working to bring the TC39 committee (the one that specifies JavaScript) to consensus around the Hack pipe.',
    );

    expect(children).toEqual([
      {
        text: 'The Smart-Mix syntax has since evolved into its current Hack iteration, dropping the "bare style" (',
        type: 'text',
      },
      {
        code: true,
        text: 'x |> a.b',
        type: 'text',
      },
      {
        text: ', without a placeholder) and simplifying its syntax accordingly. Around that time, the previous champion of the proposal, ',
        type: 'text',
      },
      {
        children: [
          {
            type: 'text',
            text: 'Daniel Ehrenberg',
          },
        ],
        type: 'a',
        url: 'https://twitter.com/littledan',
      },
      {
        text: ', stepped down and ',
        type: 'text',
      },
      {
        children: [
          {
            text: 'Tab Atkins-Bittner',
            type: 'text',
          },
        ],
        type: 'a',
        url: 'https://twitter.com/tabatkins',
      },
      {
        text: ' stepped in to take his place. While Daniel favored the F# pipe, Tab favored the Smart pipe previously and the evolved Hack pipe now and as champion, had been working to bring the TC39 committee (the one that specifies JavaScript) to consensus around the Hack pipe.',
        type: 'text',
      },
    ]);
  });

  it('should handle code around a tag', () => {
    const children = contentToChildren(
      'Right now, the functional community is cut off from the rest of the JavaScript ecosystem. In order to do any of the fun & exciting things functional programming enables, you need to use specially-designed functional libraries. <code><a href="https://github.com/lodash/lodash/tree/4.17.15-npm/fp">lodash/fp</a></code> is one well-known example; <a href="https://ramdajs.com/">Ramda</a> is another. While the immutability & side-effect-free behaviors of these libraries are extremely valuable to both functional programmers & the wider JavaScript community, they both also bring in the overhead of one of functional programming\'s more complicated concepts: currying.',
    );

    expect(children).toEqual([
      {
        text: 'Right now, the functional community is cut off from the rest of the JavaScript ecosystem. In order to do any of the fun & exciting things functional programming enables, you need to use specially-designed functional libraries. ',
        type: 'text',
      },
      {
        children: [
          {
            code: true,
            text: 'lodash/fp',
            type: 'text',
          },
        ],
        type: 'a',
        url: 'https://github.com/lodash/lodash/tree/4.17.15-npm/fp',
      },
      {
        text: ' is one well-known example; ',
        type: 'text',
      },
      {
        children: [
          {
            text: 'Ramda',
            type: 'text',
          },
        ],
        type: 'a',
        url: 'https://ramdajs.com/',
      },
      {
        text: " is another. While the immutability & side-effect-free behaviors of these libraries are extremely valuable to both functional programmers & the wider JavaScript community, they both also bring in the overhead of one of functional programming's more complicated concepts: currying.",
        type: 'text',
      },
    ]);
  });

  it('should parse blockquote correctly', () => {
    const children = contentToChildren(
      `<p>This sentence includes a <a href=\"http://example.com\">link</a>, followed by a blockquote</p>\n<blockquote>\n<p>This blockquote includes a paragraph as well.</p>\n</blockquote>`,
    );

    expect(children).toEqual([
      {
        type: 'p',
        children: [
          { type: 'text', text: 'This sentence includes a ' },
          {
            type: 'a',
            url: 'http://example.com',
            children: [{ type: 'text', text: 'link' }],
          },
          { type: 'text', text: ', followed by a blockquote' },
        ],
      },
      {
        type: 'mdxJsxFlowElement',
        name: 'ExtendedQuote',
        props: {
          children: {
            type: 'root',
            children: [
              {
                type: 'p',
                children: [
                  {
                    type: 'text',
                    text: 'This blockquote includes a paragraph as well.',
                  },
                ],
              },
            ],
          },
        },
      },
    ]);
  });
});
