import cc from 'classcat';
import Link from 'next/link';
import Article from './Article';
import EntryMeta from './EntryMeta';
import Snippet from './Snippet';

const h3Class = cc(['text-4xl', 'text-lightg', 'font-muli', 'mb-3']);

const Gistpen = ({
  slug,
  description,
  date,
  dateTime,
  blobs,
  linkHeader = false,
}) => (
  <Article>
    <h3 className={h3Class}>
      {linkHeader ? (
        <Link href={`/gistpens/${slug}/`}>
          <a>{description}</a>
        </Link>
      ) : (
        description
      )}
    </h3>
    <EntryMeta
      date={date}
      dateTime={dateTime}
      commentCount={0}
      author="James DiGioia"
    />
    {blobs.map(blob => (
      <Snippet
        key={blob.ID}
        code={blob.code}
        language={blob.language.slug}
        filename={blob.filename}
      />
    ))}
  </Article>
);

export default Gistpen;
