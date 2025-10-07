import { Blockquote as BlockquoteAtom } from './Blockquote';
import { Ul, Ol, Li } from './lists';

export default {
  title: '@ui/atoms',
};

export const Blockquote = {
  render: () => (
    <BlockquoteAtom>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </BlockquoteAtom>
  ),
};

export const Lists = {
  render: () => (
    <>
      <Ol>
        <Li>Ordered item 1</Li>
        <Li>Ordered item 2</Li>
        <Li>Ordered item 3</Li>
      </Ol>
      <Ul>
        <Li>Unordered item 1</Li>
        <Li>Unordered item 2</Li>
        <Li>Unordered item 3</Li>
      </Ul>
    </>
  ),
};
