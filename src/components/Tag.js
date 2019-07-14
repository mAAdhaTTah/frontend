import React from 'react';

const Tag = ({ title, date, author, content }) => {
  return (
    <article>
      <h1>{title}</h1>
      <p>Posted: {date}</p>
      <p>{author}</p>
      <p>TODO comments count</p>
      <img src="#" alt="TODO featured image" />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default Tag;
