import '../css/index.css';
import React from 'react';
import { useRouter } from 'next/router';
import { Provider as PrismProvider } from '../components/Prism';
import { Layout } from '../components';

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <PrismProvider>
      <Layout pathname={router.asPath} {...pageProps.layout}>
        <Component {...pageProps} />
      </Layout>
    </PrismProvider>
  );
};

export default App;
