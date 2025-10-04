import cc from 'classcat';
import { Main } from '@ui/box';
import { ServerImage } from '@ui/server';
import { Heading } from '@ui/typography';
import EntryMeta from '@ui/components/EntryMeta';
import { format } from 'date-fns';

/** @type {import('react').FC<{
 *  content: import('react').ReactNode;
 *  frontmatter: import('./server').PageFMSchema}>
 * }
 */
export const VaultPage = async ({ content, frontmatter }) => {
  const featuredMedia = frontmatter.essay?.featuredMedia;
  const date = format(frontmatter.web.published_at, 'MMMM do, yyyy');
  const dateTime = frontmatter.web.published_at.toISOString();

  return (
    <Main>
      <header className="mb-8">
        <div className={cc(['w-full', 'bg-etched', 'rounded', 'p-5', 'mb-4'])}>
          {featuredMedia && (
            <div className="relative overflow-hidden rounded w-full h-80">
              <ServerImage
                src={featuredMedia.source}
                altText={featuredMedia.alt}
                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
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
      {content}
    </Main>
  );
};
