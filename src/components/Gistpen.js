import React from 'react';
import cc from 'classcat';
import Article from './Article';
import EntryMeta from './EntryMeta';
import Snippet from './Snippet';

const h3Class = cc(['text-4xl', 'text-lightg', 'font-header', 'mb-3']);

const Gistpen = ({ description, date, dateTime, blobs }) => (
  <Article>
    <h3 className={h3Class}>{description}</h3>
    <EntryMeta
      date={date}
      dateTime={dateTime}
      commentCount={0}
      author="James DiGioia"
    />
    {blobs.map(blob => (
      <Snippet
        key={blob.id}
        code={blob.code}
        language={blob.language.slug}
        filename={blob.filename}
      />
    ))}
  </Article>
);

export default Gistpen;
