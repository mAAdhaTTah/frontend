import '../index.css';
import { useRouter } from 'next/router';
import { Provider as PrismProvider } from '../components/Prism';
import { Layout } from '../components';

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <PrismProvider>
      <Layout
        {...pageProps.layout}
        header={{ ...pageProps.layout.header, pathname: router.asPath }}
      >
        <Component {...pageProps} />
      </Layout>
    </PrismProvider>
  );
};

export default App;
