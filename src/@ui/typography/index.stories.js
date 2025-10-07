import { Heading } from './Heading';
import { Paragraph } from './Paragraph';
import {
  EM,
  Strong,
  Small,
  Abbr,
  Acronym,
  Del,
  Ins,
  Code,
  Kbd,
  Q,
  Samp,
  Sub,
  Sup,
  Var,
} from './inline';

export default {
  title: '@ui/typography',
};

export const HeaderTypographies = {
  render: () => (
    <>
      <Heading level={3} variant="article">
        Article heading
      </Heading>
      <Heading level={3} variant="h-2">
        H-2 heading
      </Heading>
      <Heading level={3} variant="h-3">
        H-3 heading
      </Heading>
      <Heading level={3} variant="h-4">
        H-4 heading
      </Heading>
    </>
  ),
};

export const BodyTypographies = {
  render: () => (
    <>
      <Paragraph>
        This paragraph represents an article. It contains many different,
        sometimes useful,{' '}
        <a href="https://www.w3schools.com/tags/">HTML5 tags</a>. Of course
        there are classics like <EM>emphasis</EM>, <Strong>strong</Strong>, and{' '}
        <Small>small</Small> but there are many others as well. Hover the
        following text for abbreviation tag:{' '}
        <Abbr title="abbreviation">abbr</Abbr>. Similarly, you can use acronym
        tag like this: <Acronym title="For The Win">ftw</Acronym>. You can
        define <Del>deleted text</Del> which often gets replaced with{' '}
        <Ins>inserted</Ins> text.
      </Paragraph>
      <Paragraph>
        You can also use <Kbd>keyboard text</Kbd>, which sometimes is styled
        similarly to the <Code>&lt;code&gt;</Code> or <Samp>samp</Samp> tags.
        Even more specifically, there is a tag just for <Var>variables</Var>.
        Not to be mistaken with blockquotes below, the quote tag lets you denote
        something as <Q>quoted text</Q>. Lastly don't forget the sub (H
        <Sub>2</Sub>O) and sup (E = MC<Sup>2</Sup>) tags.
      </Paragraph>
    </>
  ),
};
