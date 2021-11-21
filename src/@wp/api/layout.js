import { strapi } from '@strapi/api';
import { backgroundImage, avatarImage } from '../../components/images';
import { wp } from './wp';

export const getLayoutProps = async () => {
  const { data: siteMeta } = await wp.get(`/wp-json/`);
  const {
    data: [menu],
  } = await strapi.get('/menus', {
    params: {
      location: 'header',
      _limit: 1,
    },
  });

  return {
    header: {
      title: siteMeta.name,
      description: siteMeta.description,
      links: menu.menu_items.map(link => ({ to: link.href, text: link.text })),
      backgroundImage,
      avatarImage,
      fullScreen: false,
    },
  };
};
