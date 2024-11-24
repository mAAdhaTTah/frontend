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
      <header className="relative mb-5">
        {featuredMedia && (
          <ServerImage
            src={featuredMedia.source}
            altText={featuredMedia.alt}
            priority
          />
        )}
        <div
          className={cc([
            {
              absolute: !!featuredMedia,
              'pin-x-center': !!featuredMedia,
              'pin-y-bottom': !!featuredMedia,
            },
            'w-full',
            'bg-etched',
            'rounded',
            'p-5',
          ])}
        >
          <div className="text-center">
            <Heading level={1} variant="article">
              {frontmatter.web.title}
            </Heading>
          </div>
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
