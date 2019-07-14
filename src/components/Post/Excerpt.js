import React from 'react';

const Excerpt = ({ title, date, author, excerpt }) => {
  return (
    <article>
      <h3>{title}</h3>
      <p>Posted: {date}</p>
      <p>{author}</p>
      <p>TODO comments count</p>
      <img src="#" alt="TODO featured image" />
      <div dangerouslySetInnerHTML={{ __html: excerpt }} />
    </article>
  );
};

export default Excerpt;
