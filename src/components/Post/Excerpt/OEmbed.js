import EmbedContainer from 'react-oembed-container';
import { Article } from '@ui/box';
import EntryMeta from '../../EntryMeta';
import { LinkedArticleHeader } from '../../LinkedArticleHeader';
import { useParseHTML } from '../../../hooks';

const OEmbed = ({
  title,
  date,
  dateTime,
  commentCount,
  author,
  oembed,
  content,
}) => {
  const { html, url } = oembed;
  const embed = useParseHTML(html ?? '');

  return (
    <Article variant="tertiary">
      <header>
        <LinkedArticleHeader href={url}>
          {useParseHTML(title)}
        </LinkedArticleHeader>
        <EntryMeta
          date={date}
          dateTime={dateTime}
          commentCount={commentCount}
          author={author.name}
        />
      </header>
      {
        html ? (
          <div className="mb-5">
            <EmbedContainer markup={html}>{embed}</EmbedContainer>
          </div>
        ) : null /* TODO(mAAdhaTTah) render error */
      }
      {useParseHTML(content)}
    </Article>
  );
};

export default OEmbed;
