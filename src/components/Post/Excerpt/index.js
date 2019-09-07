import React from 'react';
import UnsupportedFormat from '../../UnsupportedFormat';
import OEmbed from './OEmbed';
import Standard from './Standard';
import Link from './Link';
import Status from './Status';
import Quote from './Quote';
import Image from './Image';
import Gallery from './Gallery';

const Excerpt = ({ format, ...props }) => {
  switch (format) {
    case 'audio':
      return <OEmbed {...props} />;
    case 'gallery':
      return <Gallery {...props} />;
    case 'image':
      return <Image {...props} />;
    case 'link':
      return <Link {...props} />;
    case 'quote':
      return <Quote {...props} />;
    case 'status':
      return <Status {...props} />;
    case 'video':
      return <OEmbed {...props} />;
    case 'standard':
      return <Standard {...props} />;
    default:
      return <UnsupportedFormat format={format} />;
  }
};

export default Excerpt;
