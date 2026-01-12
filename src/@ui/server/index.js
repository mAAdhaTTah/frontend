import 'server-only';
import Image from 'next/image';
import { Suspense } from 'react';
import { TweetSkeleton, EmbeddedTweet, TweetNotFound } from 'react-tweet';
import { getTweet as _getTweet } from 'react-tweet/api';
import { getPlaiceholder } from 'plaiceholder';
import { Post } from '@ui/components';
import { Heading } from '@ui/typography';
import { getRecentEssayExcerpts } from '@vault/server';
import { cacheLife, cacheTag } from 'next/cache';

const getTweet = async id => {
  'use cache';
  cacheTag('tweet');
  cacheLife({ revalidate: 3600 * 24 });
  return _getTweet(id);
};

const TweetPage = async ({ id }) => {
  try {
    const tweet = await getTweet(id);
    return tweet ? <EmbeddedTweet tweet={tweet} /> : <TweetNotFound />;
  } catch (error) {
    console.error(error);
    return <TweetNotFound error={error} />;
  }
};

const getImageInfo = async src => {
  'use cache';
  const res = await fetch(src, {
    cache: 'no-store',
  });
  const buffer = Buffer.from(await res.arrayBuffer());
  const {
    base64,
    metadata: { width, height },
  } = await getPlaiceholder(buffer);
  return { base64, width, height };
};

const TWITTER_ID_REGEX = /https:\/\/twitter.com\/(.*)\/(.*)\/(?<twId>[0-9]+)/;

export const ServerEmbed = async ({ src, ...props }) => {
  if (src.startsWith('https://twitter.com')) {
    const twId = TWITTER_ID_REGEX.exec(src)?.groups?.twId;
    if (!twId) return <TweetNotFound />;
    return (
      // TODO Put tweet outside of `p`
      <Suspense fallback={<TweetSkeleton />}>
        <TweetPage id={twId} />
      </Suspense>
    );
  }

  return <ServerImage src={src} {...props} />;
};

export const ServerImage = async ({
  src,
  altText,
  className = '',
  priority = false,
}) => {
  const { width, height, base64 } = await getImageInfo(src);

  return (
    <Image
      width={width}
      height={height}
      alt={altText ?? ''}
      src={src}
      blurDataURL={base64}
      placeholder={base64 ? 'blur' : 'empty'}
      className={className}
      priority={priority}
    />
  );
};

export const RecentEssays = async () => {
  const excerpts = await getRecentEssayExcerpts();

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
