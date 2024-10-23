import UnsupportedFormat from '../../UnsupportedFormat';
import OEmbed from './OEmbed';
import Image from './Image';
import Gallery from './Gallery';
import Standard from './Standard';
import Link from './Link';
import Status from './Status';
import Quote from './Quote';

const Excerpt = ({ format, ...props }: any) => {
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
