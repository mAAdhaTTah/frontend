import { wp } from './wp';

export const getLayoutProps = async () => {
  const { data: siteMeta } = await wp.get(`/wp-json/`);

  return {
    site: {
      name: siteMeta.name,
      description: siteMeta.description,
      url: ``,
    },
  };
};
