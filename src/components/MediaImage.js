import React from 'react';
import Img from 'gatsby-image';

const MediaImage = ({ media, className = '' }) =>
  /* @TODO(mAAdhaTTah) Sharp chokes on gifs so we won't get an image. */
  /* @TODO(mAAdhaTTah) There's an image in the mohonk gallery w/ an error */
  media.url.includes('gif') || media.src.image.fluid == null ? (
    <img src={media.url} alt={media.alt} className={className} />
  ) : (
    <Img fluid={media.src.image.fluid} alt={media.alt} className={className} />
  );

export default MediaImage;
