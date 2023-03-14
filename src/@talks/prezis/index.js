import dynamic from 'next/dynamic';

export const BrookjsAtReactnyc = dynamic(
  () => import('./brookjs-at-reactnyc'),
  { ssr: false },
);
export const UsingVuejsInServerRenderedEnvironments = dynamic(
  () => import('./using-vuejs-in-server-rendered-environments'),
  { ssr: false },
);
export const UnderstandingObservablesByMetaphor = dynamic(
  () => import('./understanding-observables-by-metaphor'),
  { ssr: false },
);
export const IBitcoinAndNowIHaveToGoToTheDentist = dynamic(
  () => import('./i-bitcoin-and-now-i-have-to-go-to-the-dentist'),
  { ssr: false },
);
export const WpgistpenAGistCloneForWordpress = dynamic(
  () => import('./wp-gistpen-a-gist-clone-for-wordpress'),
  { ssr: false },
);
export const UnitTestingReactWithJestAndRtl = dynamic(
  () => import('./unit-testing-react-with-jest-and-rtl'),
  { ssr: false },
);
export const OptionalChainingAndNullishCoalescing = dynamic(
  () => import('./optional-chaining-and-nullish-coalescing'),
  { ssr: false },
);

export const UnderstandingJestMocks = dynamic(
  () => import('./understanding-jest-mocks'),
  { ssr: false },
);
