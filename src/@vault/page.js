import cc from 'classcat';
import { Main } from '@ui/box';
import { ServerImage } from '@ui/server';
import { Heading, Link } from '@ui/typography';
import EntryMeta, { dateDateTimeDisplay } from '@ui/components/EntryMeta';
import { extract } from '@extractus/oembed-extractor';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Ul, Li } from '@ui/atoms';
import { Marp } from '@marp-team/marp-core';
import { EmbedError } from './EmbedFallback';
import { MarpSlides } from './Marp';

const Embed = async ({ url }) => {
  // Throwing the error breaks static rendering so we're going to try/catch instead
  // I would love to use the custom error boundary for this
  try {
    const embed = await extract(url);

    return (
      <div>
        <ServerImage src={embed.thumbnail_url} />
      </div>
    );
  } catch (error) {
    return <EmbedError message={error.message} />;
  }
};

/**
 * @type {import('react').FC<{
 *  link: import('./server').PageFMSchema['link'];
 * }>
 */
const LinkHeader = ({ link }) => {
  const { date, dateTime } = dateDateTimeDisplay(link.bookmarked_at);

  return (
    <div className="mb-4">
      <header className="mb-4">
        <Heading level={2} variant="article" className="text-center">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {link.title}
          </a>
        </Heading>
        <EntryMeta date={date} dateTime={dateTime} />
      </header>
      <ErrorBoundary FallbackComponent={EmbedError}>
        <Suspense
          fallback={
            <div className="font-ovo text-xl font-bold">Loading...</div>
          }
        >
          <Embed url={link.url} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const LinkFooter = async ({ link }) => {
  return (
    <div>
      <Heading level={2} variant="h-2">
        Related
      </Heading>
      <Ul>
        {link.related.map(related => (
          <Li key={related.web.slug}>
            <Link href={'/' + related.web.slug}>{related.web.title}</Link>
          </Li>
        ))}
      </Ul>
    </div>
  );
};

const EssayHeader = ({ featuredMedia, frontmatter, date, dateTime }) => {
  return (
    <header className="mb-8">
      <div className={cc(['w-full', 'bg-etched', 'rounded', 'p-5', 'mb-4'])}>
        {featuredMedia && (
          <div className="relative overflow-hidden rounded w-full h-80">
            <ServerImage
              src={featuredMedia.source}
              altText={featuredMedia.alt}
              className="absolute pin-y-50 pin-x-50 translate-x-[-50%] translate-y-[-50%]"
              priority
            />
          </div>
        )}
        <Heading level={1} variant="article" className="text-center">
          {frontmatter.web.title}
        </Heading>
        <div className="flex justify-center">
          <EntryMeta
            date={date}
            dateTime={dateTime}
            author="James DiGioia"
            className="grow-0"
          />
        </div>
      </div>
    </header>
  );
};

const GalleryFooter = ({ gallery }) => {
  return (
    <div className="grid grid-cols-3 grid-rows-auto gap-4">
      {gallery.images.map((image, i) => (
        <ServerImage key={i} src={image.source} altText={image.alt} />
      ))}
    </div>
  );
};

/**
 * @type {import('react').FC<{
 *  source: string;
 * }>}
 */
const Talk = ({ source }) => {
  const marp = new Marp({
    container: false,
    script: false,
    printable: false,
  });
  const { html, css } = marp?.render(source, { htmlAsArray: true });

  return <MarpSlides rendered={{ html, css }} />;
};

/**
 * @type {import('react').FC<{
 *  content: import('react').ReactNode;
 *  frontmatter: import('./server').PageFMSchema;
 *  source: string;
 * }>}
 */
export const VaultPage = async ({ content, frontmatter, source }) => {
  return (
    <>
      {frontmatter.talk ? (
        <main className="h-screen bg-white">
          <Talk source={source} />
        </main>
      ) : (
        <Main>
          {frontmatter.essay ? (
            <EssayHeader
              featuredMedia={frontmatter.essay?.featuredMedia}
              frontmatter={frontmatter}
              {...dateDateTimeDisplay(frontmatter.web.published_at)}
            />
          ) : null}
          {frontmatter.link ? <LinkHeader link={frontmatter.link} /> : null}
          {content}
          {frontmatter.gallery ? (
            <GalleryFooter gallery={frontmatter.gallery} />
          ) : null}
          {frontmatter.link ? <LinkFooter link={frontmatter.link} /> : null}
        </Main>
      )}
    </>
  );
};
