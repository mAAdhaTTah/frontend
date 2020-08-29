import React from 'react';
import cc from 'classcat';
import Spacer from './Spacer';

const entryMetaClass = cc([
  'entry-meta',
  'my-2',
  'flex',
  'rounded',
  'bg-secondary',
  'p-3',
  'mb-3',
]);
const metaClass = cc(['font-body']);

const EntryMeta = ({ className = '', date, dateTime, author }) => (
  <div className={cc([className, entryMetaClass])}>
    <time className={cc([metaClass, 'published'])} dateTime={dateTime}>
      {date}
    </time>
    <Spacer />
    <p className={metaClass}>{author}</p>
    {/* @TODO(mAAdhaTTah) comments aren't retreived */}
    {/* <Spacer /> <p className={metaClass}>
      {commentCount ? `${commentCount} comments` : 'No comments'}
    </p> */}
  </div>
);

export default EntryMeta;
