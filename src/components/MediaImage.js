import React from 'react';

const MediaImage = ({ media, className = '' }) =>
  /* @TODO(mAAdhaTTah) There's an image in the mohonk gallery w/ an error */
  <img src={media.url} alt={media.alt} className={className} />;

export default MediaImage;
