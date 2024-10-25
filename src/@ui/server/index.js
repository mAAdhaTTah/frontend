import 'server-only';
import { unstable_cache as cache } from 'next/cache';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import { Post } from '@ui/components';
import { Heading } from '@ui/typography';
import { getWritingArchiveProps } from '@tina/server';
import { nodeToExcerptMapper, nodeToProps } from '@tina/page';

const getImageInfo = cache(async src => {
  const res = await fetch(src);
  const buffer = Buffer.from(await res.arrayBuffer());
  const {
    base64,
    metadata: { width, height },
  } = await getPlaiceholder(buffer);
  return { base64, width, height };
});

export const ServerImage = async ({ src, altText }) => {
  const { width, height, base64 } = await getImageInfo(src);

  return (
    <Image
      width={width}
      height={height}
      alt={altText ?? ''}
      src={src}
      blurDataURL={base64}
      placeholder={base64 ? 'blur' : 'empty'}
    />
  );
};

export const RecentEssays = async () => {
  const {
    extra: { posts, ...extra },
  } = await getWritingArchiveProps({
    page: 1,
  });
  const excerpts = posts.data.postConnection.edges.map(({ node }) =>
    nodeToProps(node, extra, nodeToExcerptMapper),
  );

  return (
    <>
      <Heading level={2} variant="h-2">
        Recent Essays
      </Heading>
      {excerpts.map(excerpt => (
        <div className="-m-5">
          <Post.Excerpt key={excerpt.id} {...excerpt} />
        </div>
      ))}
    </>
  );
};
