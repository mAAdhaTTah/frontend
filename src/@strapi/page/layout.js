import { headerImage, avatarImage } from '../../components/images';
import { resolveSegments } from '../api';

export const getPageLayoutProps = page => ({
  header: {
    title: page.header.title,
    description: page.header.description,
    links: page.menu.menu_items.map(link => {
      switch (link.__component) {
        case 'links.internal-link':
          return {
            to: `/${resolveSegments(link.target).join('/')}/`.replace(
              '//',
              '/',
            ),
            text: link.text,
          };
        case 'menu.menu-item':
          return {
            to: link.href,
            text: link.text,
          };
        default:
          throw new Error(`Invalid menu component ${link.__component}`);
      }
    }),
    backgroundImage: page.header.image || headerImage,
    avatarImage: page.header.avatar || avatarImage,
    fullScreen: page.template === 'full_screen',
  },
});
