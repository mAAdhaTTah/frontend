export const AspectRatioEmbed = ({ aspectRatio, html }) => {
  return (
    // TODO(James) extract to CSS
    // May be able to combine down to one div with pseudo-element
    <div
      style={{
        maxWidth: '600px',
        width: '100%',
      }}
    >
      <div
        className="mb-5"
        style={{
          position: 'relative',
          paddingTop: `${aspectRatio * 100}%`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
};
