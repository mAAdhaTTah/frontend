import { TinaPage } from '@tina/page';
import { getGistpenArchivePaths, getGistpenArchiveProps } from '@tina/server';

type PageProps = {
  params: {
    number: string;
  };
};

const GistpenArchive = async ({ params }: PageProps) => {
  const { response, extra } = await getGistpenArchiveProps({
    page: Number(params.number),
  });
  return <TinaPage response={response} extra={extra} />;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<import('next').Metadata> => {
  const { response } = await getGistpenArchiveProps({
    page: Number(params.number),
  });

  return {
    title: response.data.page.title,
    description: response.data.page.description,
  };
};

export const generateStaticParams = async () => {
  const paths = await getGistpenArchivePaths();
  return paths.map(value => value.params);
};

export default GistpenArchive;
