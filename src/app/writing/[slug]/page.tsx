import { TinaPage } from '@tina/page';
import { getWritingPaths, getWritingSingleProps } from '@tina/server';

type PageProps = {
  params: {
    slug: string;
  };
};

const WritingSingle = async ({ params }: PageProps) => {
  const { response, extra } = await getWritingSingleProps(params.slug);
  return <TinaPage response={response} extra={extra} />;
};

/**
 * @returns {Promise<import('next').Metadata>}
 */
export const generateMetadata = async ({ params }: PageProps) => {
  const { extra } = await getWritingSingleProps(params.slug);
  switch (extra.post.data.post.__typename) {
    case 'PostAside':
    case 'PostStatus':
      return {
        title: 'TODO',
        description: 'TODO',
      };
    case 'PostAudio':
    case 'PostVideo':
    case 'PostImage':
    case 'PostGallery':
    case 'PostLink':
    case 'PostQuote':
      return {
        title: extra.post.data.post.title,
        description: 'TODO',
      };
    default:
      return {
        title: extra.post.data.post.title,
        description: extra.post.data.post.excerpt,
      };
  }
};

export const generateStaticParams = async () => {
  const paths = await getWritingPaths();
  return paths.map(value => value.params);
};

export default WritingSingle;
