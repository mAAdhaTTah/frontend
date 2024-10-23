import dynamic from 'next/dynamic';

/**
 * @typedef {Object} Prezi
 * @property {string} title
 * @property {string} description
 * @property {React.ComponentType} component
 */

/** @type Prezi */
export const BrookjsAtReactnyc = {
  title: 'brookjs at ReactNYC',
  description:
    'brookjs was a web framework based on observables. That framework is now archived, but this was a look at some of the principles underlying it.',
  component: dynamic(() => import('./brookjs-at-reactnyc'), { ssr: false }),
};

/** @type Prezi */
export const UsingVuejsInServerRenderedEnvironments = {
  title: 'Using Vue.js in Server Rendered Environments',
  description:
    "If you can't server-side render with Node, Vue can be a solid option, providing the relevant SEO content on page load while enabling component-based interactivity.",
  component: dynamic(
    () => import('./using-vuejs-in-server-rendered-environments'),
    { ssr: false },
  ),
};

/** @type Prezi */
export const UnderstandingObservablesByMetaphor = {
  title: 'Understanding Observables by Metaphor',
  description:
    'RxJS-style observables are a powerful but complex for building reactive applications. This talk is an attempt to understand them by relating them to other concepts we know well.',
  component: dynamic(() => import('./understanding-observables-by-metaphor'), {
    ssr: false,
  }),
};

/** @type Prezi */
export const IBitcoinAndNowIHaveToGoToTheDentist = {
  title: 'I Bitcoin and Now I Have to Go to the Dentist',
  description:
    'As Bitcoin was taking off, I did this talk with a coworker, going over Bitcoin and how it worked and discussing some of the pros & cons to its rise.',
  component: dynamic(
    () => import('./i-bitcoin-and-now-i-have-to-go-to-the-dentist'),
    { ssr: false },
  ),
};

/** @type Prezi */
export const WpgistpenAGistCloneForWordpress = {
  title: 'WP-Gistpen A Gist Clone for WordPress',
  description:
    "WP-Gistpen was a WordPress plugin for organizing code snippets, enabling two-way sync between your WordPress install & GitHub's Gist.",
  component: dynamic(() => import('./wp-gistpen-a-gist-clone-for-wordpress'), {
    ssr: false,
  }),
};

/** @type Prezi */
export const UnitTestingReactWithJestAndRtl = {
  title: 'Unit Testing React with Jest and RTL',
  description:
    'An introduction to unit testing React component using Jest & @testing-library/react (RTL).',
  component: dynamic(() => import('./unit-testing-react-with-jest-and-rtl'), {
    ssr: false,
  }),
};

/** @type Prezi */
export const OptionalChainingAndNullishCoalescing = {
  title: 'Optional Chaining and Nullish Coalescing',
  description:
    "Optional Chaining & Nullish Coalescing are two new features introduced to the JavaScript language. Let's take a look at what they are and how they work together.",
  component: dynamic(
    () => import('./optional-chaining-and-nullish-coalescing'),
    { ssr: false },
  ),
};
