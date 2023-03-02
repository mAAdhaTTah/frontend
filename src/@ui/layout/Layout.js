import PropTypes from 'prop-types';
import cc from 'classcat';
import { createRef, useRef } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { Header } from './Header';
import Nav from './Nav';

export const Layout = ({ layout, header, nav, children }) => {
  const refsMap = useRef({});
  const key = header.pathname;
  const nodeRef = refsMap.current[key] ?? (refsMap.current[key] = createRef());
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
          'grid-cols-[0px_100vw] xl:grid-cols-[352px_1fr]': !fullScreen,
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
      <div className="relative">
        <SwitchTransition mode={'out-in'}>
          <CSSTransition
            key={key}
            nodeRef={nodeRef}
            timeout={600}
            classNames="fade"
            unmountOnExit
          >
            {state =>
              layout !== 'fullscreen' ? (
                <div
                  ref={nodeRef}
                  className={cc([
                    'absolute',
                    'w-full',
                    'h-screen',
                    'overflow-auto',
                  ])}
                >
                  {children}
                </div>
              ) : null
            }
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};

Layout.propTypes = {
  header: PropTypes.object.isRequired,
  nav: PropTypes.object.isRequired,
  children: PropTypes.node,
};
