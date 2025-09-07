import { ArrowLink } from '@ui/atoms';
import { Main } from '@ui/box';
import { Heading, Paragraph } from '@ui/typography';

const NotFound = () => {
  return (
    <Main>
      <Heading level={1} variant="h-1">
        Not Found
      </Heading>
      <Paragraph>
        I recently refreshed my website, and not all content that was previously
        present has been re-uploaded. If you landed here and expected to find
        something, please reach out to me at: jamesorodig@gmail.com.
      </Paragraph>
      <ArrowLink slug="/writing">Return to Writing Home</ArrowLink>
    </Main>
  );
};

export default NotFound;
