import { TinaPage } from '@tina/page';
import { get500PageProps } from '@tina/server';

const ServerErrorPage = ({ response }) => {
  return <TinaPage response={response} />;
};

export const getStaticProps = async () => ({
  props: await get500PageProps(),
});

export default ServerErrorPage;
