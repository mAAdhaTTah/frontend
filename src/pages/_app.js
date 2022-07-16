import { useRouter } from 'next/router';
import '../index.css';
import { DefaultSeo } from 'next-seo';
import { Provider as PrismProvider } from '@ui/components/Prism';
import { Layout } from '@ui/components';

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <PrismProvider>
      <DefaultSeo
        titleTemplate="%s | James DiGioia"
        defaultTitle="James DiGioia"
        description="my little web home"
      />
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
