import { Resume } from './';

export default {
  title: '@ui/resume',
};

const experiences = [
  {
    companyName: 'Stella.ai',
    description: 'Recruiting & compensation platform',
    positions: [
      {
        title: 'Engineering Lead',
        start: '2019-04',
        end: null,
        responsibilities: [
          'Lead NYC team in coordination with Sydney, Australia team',
          'Implement complex search & filter page with React Hooks',
          'Improve search API with Flask, SQLAlchemy, & Marshmallow',
          'Rebuild enterprise-facing dashboard for UX & stability',
        ],
      },
      {
        title: 'Senior Front-End Engineer',
        start: '2018-09',
        end: '2019-04',
        responsibilities: [
          'Architected & led the front-end development of B2B platform for firms to comply with pay equity laws',
          'Refactored buggy multi-step onboarding flow, improving app stability and performance',
          'Enforced React/Redux & TypeScript best practices through regular peer code review',
          'Implemented charting and graphing with Victory library',
        ],
      },
    ],
  },
  {
    companyName: 'Stellar',
    description: 'Community for terminal patients',
    positions: [
      {
        title: 'Engineer (Contract)',
        start: '2018-08',
        end: '2018-11',
        responsibilities: [
          'Developed MVP patient care app with Node.js, Express, Passport, and Objection.js',
          'Managed product lifecycle, feature triage, & AWS deployments',
          'Integrated API tests with supertest & Jest, enabling rapid iteration',
          'Implemented live chat feature with Redis and websockets',
        ],
      },
    ],
  },
  {
    companyName: 'Valtech',
    description: 'Digital agency',
    positions: [
      {
        title: 'Senior Front-End Engineer',
        start: '2015-03',
        end: '2018-09',
        responsibilities: [
          'Junior- to mid-level in <9 months; project lead in ~2.5 years; account lead in 3 years',
          'Managed team of developers across multiple projects and brands for L’Oréal account',
          'Led development team on agile ecommerce project built with Vue.js and Sitecore',
          'Architected Hybris checkout for stability and performance with Redux, Handlebars, and Kefir',
          'Redesigned product page using vanilla JavaScript and component-based architecture',
        ],
      },
    ],
  },
];

const skills = [
  {
    name: 'JavaScript',
    keywords: ['TypeScript', 'ES6'],
  },
  {
    name: 'Modern Frameworks',
    keywords: ['React.js', 'Redux', 'Vue'],
  },
  {
    name: 'Functional, Reactive',
    keywords: ['RxJS', 'Kefir', 'Ramda'],
  },
  {
    name: 'Build Tools',
    keywords: ['Webpack', 'babel', 'Grunt', 'Gulp', 'Rollup', 'Browserify'],
  },
  {
    name: 'CSS',
    keywords: [
      'SASS',
      'LESS',
      'PostCSS',
      'CSS Modules',
      'TailwindCSS',
      'styled-components',
      'Bootstrap',
    ],
  },
  {
    name: 'Testing',
    keywords: ['Jest', 'Mocha', 'Chai', 'Sinon', 'Storybook', 'Cypress'],
  },
  {
    name: 'PHP',
    keywords: ['WordPress', 'Laravel'],
  },
  {
    name: 'Python',
    keywords: ['Flask', 'SQLAlchemy', 'Marshmallow'],
  },
  {
    name: 'DevOps',
    keywords: ['Ansible', 'Vagrant', 'Docker', 'PostgreSQL'],
  },
];

const projects = [
  {
    name: 'Pipeline Operator',
    url: 'https://github.com/tc39/proposal-pipeline-operator/',
    role: 'Community Advocate',
    highlights: [
      'Advocate for new syntax into ECMAScript specification with TC39',
      'Developing babel plugins for competing proposals to gather user feedback',
    ],
  },
  {
    name: 'brookjs',
    url: 'https://github.com/mAAdhaTTah/brookjs/',
    role: 'Lead Maintainer',
    highlights: [
      'React/Redux framework for building streaming web applications',
      'Integrates functional reactive programming principles with Kefir',
    ],
  },
  {
    name: 'Kefir',
    url: 'https://kefirjs.github.io/kefir/',
    role: 'Maintainer',
    highlights: [
      'Joined team after repeated quality contributions & engagement',
      'Extracted and released chai-kefir to enable unit testing Kefir streams',
    ],
  },
  {
    name: 'Prism.js',
    url: 'https://prismjs.com/',
    role: 'Maintainer',
    highlights: [
      'Joined team after repeated quality contributions & engagement',
      'Implemented copy-to-clipboard plugin to copy PrismJS code snippets',
    ],
  },
  {
    name: 'WP-Gistpen',
    url: 'https://github.com/intraxia/wp-gistpen/',
    role: 'Lead Maintainer',
    highlights: [
      "WordPress plugin to save user's code snippets to their personal site",
      'Implemented syntax-highlighted editor with brookjs, React, Kefir, and PrismJS',
    ],
  },
];

const talks = [
  {
    name: 'Meet brookjs',
    url: 'http://talks.jamesdigioia.com/brookjs-at-reactnyc',
  },
  {
    name: 'Using Vue.js in Server Rendered Environments',
    url: 'http://talks.jamesdigioia.com/using-vuejs-in-server-rendered-environments',
  },
  {
    name: 'WP-Gistpen: A Gist Clone for WordPress',
    url: 'http://talks.jamesdigioia.com/wpgistpen-a-gist-clone-for-wordpress',
  },
];

const volunteering = [
  {
    name: 'Code Nation',
    highlights: [
      'Taught web development to students at under-resourced high schools',
      'Mentored student hackathon team',
      'Mentored interns on internal projects at Valtech Summer of 2017 & 2018',
    ],
  },
];

export const main = () => (
  <Resume
    name="James DiGioia"
    location="Bronx, NY"
    description="I am a Senior Front-End Engineer with experience in modern web frameworks & team leadership."
    experiences={experiences}
    projects={projects}
    talks={talks}
    volunteering={volunteering}
    skills={skills}
  />
);
