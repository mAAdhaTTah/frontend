import { Deck, DefaultTemplate, MarkdownSlideSet } from './spectacle';
import { InternalEmbed } from '@vault/server';

/**
 * @type {import('react').FC<{
 *  source: string;
 * }>}
 */
export const Talk = async ({ source }) => {
  return (
    <Deck
      template={<DefaultTemplate />}
      theme={{
        fonts: {
          header: 'var(--font-montserrat)',
          text: 'var(--font-montserrat)',
        },
        colors: {
          primary: '#FFF3C9',
          secondary: '#DBD1AD',
          tertiary: '#000',
          quaternary: '#5e9639',
          quinary: '#24331E',
        },
      }}
    >
      <MarkdownSlideSet
        componentProps={{
          InternalEmbed,
        }}
      >
        {source}
      </MarkdownSlideSet>
    </Deck>
  );
};
