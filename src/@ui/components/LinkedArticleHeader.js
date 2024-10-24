import { Heading } from '@ui/typography';
import { Link } from 'next-view-transitions';

export const LinkedArticleHeader = ({ href, children }) => {
  return (
    <Heading level={1} variant="article">
      <Link href={href}>{children}</Link>
    </Heading>
  );
};
