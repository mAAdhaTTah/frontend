import { server } from '@app/config';
import { Main } from '@ui/box';
import { getLayoutProps, getReadingProps, getSeoByPageId } from '@wp/api';
import { Day } from '../components';
import { withSEO } from '../decorators';

const ReadingPage = ({ reading }) => (
  <Main>
    {reading.map(({ day, links }) => (
      <Day key={day} day={day} links={links} />
    ))}
  </Main>
);

export const getStaticProps = async () => {
  return {
    props: {
      layout: await getLayoutProps(),
      seo: await getSeoByPageId(5941),
      reading: await getReadingProps(),
    },
    revalidate: server.DEFAULT_REVALIDATE_TIME,
  };
};

export default withSEO()(ReadingPage);
