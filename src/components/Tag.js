const Tag = ({ title, date, author, content }) => {
  return (
    <article>
      <h1>{title}</h1>
      <p>Posted: {date}</p>
      <p>{author}</p>
      {/* <img src="#" alt="TODO featured image" /> */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default Tag;
