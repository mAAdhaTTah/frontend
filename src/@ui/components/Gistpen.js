import { Article } from '@ui/box';
import cc from 'classcat';
import { Link } from 'next-view-transitions';
import EntryMeta from './EntryMeta';
import Snippet from './Snippet';

const h3Class = cc(['text-4xl', 'text-lightg', 'font-muli', 'mb-3']);

const Gistpen = ({
  slug,
  description,
  createdAt,
  createdAtDatetime,
  blobs,
  linkHeader = false,
}) => (
  <Article>
    <h3 className={h3Class}>
      {linkHeader ? (
        <Link href={`/gistpens/${slug}/`}>{description}</Link>
      ) : (
        description
      )}
    </h3>
    <EntryMeta
      // TODO
      date={createdAt}
      dateTime={createdAtDatetime}
      commentCount={0}
      author="James DiGioia"
    />
    {blobs.map(blob => (
      <Snippet
        key={blob.filename}
        code={blob.code}
        language={blob.language}
        filename={blob.filename}
      />
    ))}
  </Article>
);

export default Gistpen;
