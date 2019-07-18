import React from 'react';
import UnsupportedFormat from '../../UnsupportedFormat';
import OEmbed from './OEmbed';
import Standard from './Standard';
import Link from './Link';

const Excerpt = ({ format, ...props }) => {
  switch (format) {
    case 'audio':
      return <OEmbed {...props} />;
    case 'gallery':
      return <UnsupportedFormat format={format} />;
    case 'image':
      return <UnsupportedFormat format={format} />;
    case 'link':
      return <Link {...props} />;
    case 'quote':
      return <UnsupportedFormat format={format} />;
    case 'status':
      return <UnsupportedFormat format={format} />;
    case 'video':
      return <OEmbed {...props} />;
    case 'standard':
      return <Standard {...props} />;
    default:
      return <UnsupportedFormat format={format} />;
  }
};

export default Excerpt;
