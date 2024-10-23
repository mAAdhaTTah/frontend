'use client';
import PropTypes from 'prop-types';
import cc from 'classcat';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import Nav from './Nav';

// @TODO(James) extract this somehwere? does this logic belong here?
const getLayout = (pathname: any) => {
  if (pathname === '/') return 'fullscreen';

  if (pathname.startsWith('/talks/') && pathname !== '/talks/')
    return 'headerless';

  return 'standard';
};

export const Layout = ({ header, nav, children }: any) => {
  const pathname = usePathname();
  const layout = getLayout(pathname);
  const fullScreen = layout === 'fullscreen';

  return (
    <div
      className={cc([
        'relative',
        'grid',
        'transition-grid-cols',
        'duration-1000',
        'ease-[cubic-bezier(.36,.15,.44,1.25)]',
        'transform-gpu',
        {
          'grid-cols-[0px_100vw]': !fullScreen,
          'xl:grid-cols-[352px_1fr]': !fullScreen && layout !== 'headerless',

          'grid-cols-[100vw_0px]': fullScreen,
        },
      ])}
    >
      <div>
        {layout !== 'headerless' && (
          <>
            <Header {...header} fullScreen={fullScreen} />
            <Nav {...nav} />
          </>
        )}
      </div>
      <div className="relative vt-name-[content]">
        <div
          className={cc(['absolute', 'w-full', 'h-screen', 'overflow-auto'])}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  header: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
  children: PropTypes.node,
};
