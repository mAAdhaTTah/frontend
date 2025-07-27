import { Main } from '@ui/box';
import { Heading, Paragraph } from '@ui/typography';

const NotFound = () => {
  return (
    <Main>
      <Heading level={1} variant="h-1">
        Not Found
      </Heading>
      <Paragraph>
        I recently refreshed the process by which I export content to my site.
        If you landed here and expected to find something here, please reach out
        to me at: jamesorodig@gmail.com.
      </Paragraph>
    </Main>
  );
};

export default NotFound;
