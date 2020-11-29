import { shared } from './config';

export const getLayoutProps = async () => {
  const response = await fetch(`https://${shared.WP_API_DOMAIN}/wp-json/`);
  const wpMeta = await response.json();
  return {
    site: {
      name: wpMeta.name,
      description: wpMeta.description,
      url: `https://${shared.WP_API_DOMAIN}`,
    },
  };
};
