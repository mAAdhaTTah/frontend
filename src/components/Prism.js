import React, { createContext, useState, useEffect, useContext } from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

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

  const { gistpenSite } = useStaticQuery(graphql`
    query PrismQuery {
      gistpenSite {
        prism {
          line_numbers
          show_invisibles
          theme
        }
      }
    }
  `);

  return (
    <>
      <Context.Provider value={Prism}>{children}</Context.Provider>
      <Helmet>
        <script>{`window.__GISTPEN_CONTENT__ = ${JSON.stringify({
          globals: {
            url: 'https://jamesdigioia.com/app/plugins/wp-gistpen/',
          },
          prism: {
            theme: gistpenSite.prism.theme,
            'line-numbers': gistpenSite.prism.line_numbers,
            'show-invisibles': gistpenSite.prism.show_invisbles,
          },
        })};`}</script>
      </Helmet>
    </>
  );
};
