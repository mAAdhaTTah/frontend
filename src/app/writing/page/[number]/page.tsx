import { TinaPage } from '@tina/page';
import { getWritingArchiveProps, getWritingArchivePaths } from '@tina/server';
import { type Metadata } from 'next';

type PageProps = {
  params: {
    number: string;
  };
};

const GistpenArchive = async ({ params }: PageProps) => {
  const { response, extra } = await getWritingArchiveProps({
    page: Number(params.number),
  });
  return <TinaPage response={response} extra={extra} />;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { response } = await getWritingArchiveProps({
    page: Number(params.number),
  });

  return {
    title: response.data.page.title,
    description: response.data.page.description,
  };
};

export const generateStaticParams = async () => {
  const paths = await getWritingArchivePaths();
  return paths.map(value => value.params);
};

export default GistpenArchive;
