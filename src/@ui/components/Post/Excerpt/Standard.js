import { LinkedArticleHeader } from '../../LinkedArticleHeader';
import EntryMeta from '../../EntryMeta';
import { ArrowLink } from '@ui/atoms';
import { Article } from '@ui/box';

const StandardFormat = ({
  slug,
  title,
  date,
  dateTime,
  commentCount,
  author,
  excerpt,
}) => (
  <Article>
    <header>
      <LinkedArticleHeader href={`${slug}/`}>{title}</LinkedArticleHeader>
      <EntryMeta
        date={date}
        dateTime={dateTime}
        commentCount={commentCount}
        author={author.name}
      />
    </header>
    <div>
      {excerpt}
      <ArrowLink slug={slug}>Read more</ArrowLink>
    </div>
  </Article>
);

export default StandardFormat;
