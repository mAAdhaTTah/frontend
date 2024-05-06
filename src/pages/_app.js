import { useRouter } from 'next/router';
import cc from 'classcat';
import '../index.css';
import { DefaultSeo } from 'next-seo';
import { Mulish, Ovo, Montserrat } from 'next/font/google';
import { Layout } from '@ui/layout';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const mulish = Mulish({
  display: 'swap',
  variable: '--font-mulish',
  weight: ['400', '700'],
  subsets: ['latin'],
});

const ovo = Ovo({
  display: 'swap',
  weight: ['400'],
  variable: '--font-ovo',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  display: 'swap',
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <div className={cc([mulish.variable, ovo.variable, montserrat.variable])}>
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
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;
