import PropTypes from 'prop-types';
import cc from 'classcat';
import { createRef, useRef } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { Header } from './Header';

export const Layout = ({ layout, header, children }) => {
  const refsMap = useRef({});
  const key = header.pathname;
  const nodeRef = refsMap.current[key] ?? (refsMap.current[key] = createRef());
  return (
    <div className="flex flex-row">
      {layout !== 'headerless' && (
        <Header {...header} fullScreen={layout === 'fullscreen'} />
      )}
      <div className="relative grow">
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
                    'min-h-screen',
                    'transform-gpu',
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
  children: PropTypes.node,
};
