const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
        'grid-cols': 'grid-template-columns',
      },
    },
    colors: {
      etched: 'hsla(0, 0%, 100%, .35)',
      primary: '#FFF3C9',
      secondary: '#DBD1AD',
      tertiary: '#D0C394',
      darkg: '#24331E',
      lightg: '#5e9639',
      black: '#000',
      transparent: 'transparent',
    },
    screens: {
      sm: '320px',
      md: '576px',
      lg: '768px',
      xl: '992px',
      '2xl': '1120px',
      print: { raw: 'print' },
    },
    fontFamily: {
      muli: ['var(--font-mulish)', ...fontFamily.sans],
      ovo: ['var(--font-ovo)', ...fontFamily.serif],
    },
    fontSize: {
      sm: '.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '2rem', // 32px
      '4xl': '2.5rem', // 40px
      '5xl': '3rem', // 48px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      bold: 700,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      normal: 1.5,
      loose: 2,
    },
    letterSpacing: {
      tight: '-0.05em',
      normal: '0',
      wide: '0.05em',
    },
    textColor: theme => theme('colors'),
    backgroundColor: theme => theme('colors'),
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    borderColor: theme => ({
      DEFAULT: theme('colors.grey-light'),
      ...theme('colors'),
    }),
    borderRadius: {
      none: '0',
      sm: '.25rem',
      DEFAULT: '.5rem',
      lg: '2rem',
      full: '9999px',
    },
    width: {
      auto: 'auto',
      inherit: 'inherit',
      px: '1px',
      0: '0rem',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      24: '6rem',
      32: '8rem',
      48: '12rem',
      64: '16rem',
      80: '20rem',
      88: '22rem',
      96: '24rem',
      '1/2': '50%',
      '1/3': '33.33333%',
      '2/3': '66.66667%',
      '1/4': '25%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.66667%',
      '5/6': '83.33333%',
      full: '100%',
      screen: '100vw',
    },
    height: {
      auto: 'auto',
      px: '1px',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      24: '6rem',
      32: '8rem',
      48: '12rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      full: '100%',
      screen: '100vh',
    },
    minWidth: {
      0: '0',
      full: '100%',
    },
    minHeight: {
      0: '0',
      full: '100%',
      screen: '100vh',
    },
    maxWidth: {
      xs: '20rem',
      sm: '30rem',
      md: '40rem',
      lg: '50rem',
      xl: '60rem',
      '2xl': '70rem',
      '3xl': '80rem',
      '4xl': '90rem',
      '5xl': '100rem',
      full: '100%',
      content: 'fit-content',
    },
    maxHeight: {
      full: '100%',
      screen: '100vh',
      1: `${1 * 1.15}rem`,
      2: `${2 * 1.15}rem`,
      3: `${3 * 1.15}rem`,
      4: `${4 * 1.15}rem`,
      5: `${5 * 1.15}rem`,
      6: `${6 * 1.15}rem`,
    },
    padding: {
      px: '1px',
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
    },
    margin: {
      auto: 'auto',
      px: '1px',
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
      '-px': '-1px',
      '-1': '-0.25rem',
      '-2': '-0.5rem',
      '-3': '-0.75rem',
      '-4': '-1rem',
      '-5': '-1.25rem',
      '-6': '-1.5rem',
      '-8': '-2rem',
      '-10': '-2.5rem',
      '-12': '-3rem',
      '-16': '-4rem',
      '-20': '-5rem',
      '-24': '-6rem',
      '-32': '-8rem',
    },
    boxShadow: {
      DEFAULT: '0 2px 4px 0 rgba(0,0,0,0.10)',
      md: '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',
      lg: '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
      inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
      outline: '0 0 0 3px rgba(52,144,220,0.5)',
      none: 'none',
    },
    zIndex: {
      auto: 'auto',
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
    },
    opacity: {
      0: '0',
      25: '.25',
      50: '.5',
      75: '.75',
      100: '1',
    },
    fill: {
      current: 'currentColor',
    },
    stroke: {
      current: 'currentColor',
    },
  },
  plugins: [require('tailwindcss-view-transitions')],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
