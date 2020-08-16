import React, { createContext, useState, useEffect, useContext } from 'react';
import Helmet from 'react-helmet';

const Context = createContext(null);

export const usePrism = () => useContext(Context);

export const Provider = ({ children }) => {
  const [Prism, setPrism] = useState(null);

  useEffect(() => {
    if (window.Prism) {
      Prism !== window.Prism && setPrism(window.Prism);
      return;
    }

    let mounted = true;

    const script = document.createElement('script');
    const head = document.getElementsByTagName('head')[0];
    script.defer = true;
    script.src =
      'https://jamesdigioia.com/app/plugins/wp-gistpen/resources/assets/content.min.js';

    script.addEventListener('load', () => {
      mounted && setPrism(window.Prism);
    });

    head.appendChild(script);

    return () => {
      mounted = false;
      head.removeChild(script);
    };
    // We don't want Prism as a dep here.
    // It references itself, causing issues.
    // eslint-disable-next-line
  }, []);

  // @TODO(mAAdhaTTah) get properties from query
  return (
    <>
      <Context.Provider value={Prism}>{children}</Context.Provider>
      <Helmet>
        <script>{`window.__GISTPEN_CONTENT__ = {
        globals: {
          url: 'https://jamesdigioia.com/app/plugins/wp-gistpen/'
        },
        prism: {
          theme: 'twilight',
          'line-numbers': true,
          'show-invisibles': true
        }
      }`}</script>
      </Helmet>
    </>
  );
};
