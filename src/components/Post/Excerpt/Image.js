import MediaImage from '../../MediaImage';
import Article from '../../Article';
import EntryMeta from '../../EntryMeta';
import { ArticleHeader } from '../../typography';
import { useParseHTML } from '../../../hooks';

const Image = ({
  title,
  date,
  dateTime,
  commentCount,
  author,
  content,
  media,
}) => {
  return (
    <Article variant="darkg">
      <header>
        <ArticleHeader>{useParseHTML(title)}</ArticleHeader>
        <EntryMeta
          date={date}
          dateTime={dateTime}
          commentCount={commentCount}
          author={author.name}
        />
      </header>
      {media && <MediaImage media={media} />}

      {useParseHTML(content, {
        p: 'text-primary',
      })}
    </Article>
  );
};

export default Image;
