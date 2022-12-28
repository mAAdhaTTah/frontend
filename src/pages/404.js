import { TinaPage } from '@tina/page';
import { get404PageProps } from '@tina/server';

const ServerErrorPage = ({ response }) => {
  return <TinaPage response={response} />;
};

export const getStaticProps = async () => ({
  props: await get404PageProps(),
});

export default ServerErrorPage;
