import { getLayoutProps, getReadingProps, getSeoByPageId } from '../api';
import { Day, Main } from '../components';
import { server } from '../config';
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
