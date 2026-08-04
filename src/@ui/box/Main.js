import cc from 'classcat';

export const Main = ({ children, wide = false }) => (
  <main
    className={cc([
      'print:pt-0',
      'print:mx-0',
      'print:px-0',
      'print:max-w-full',
      'p-5',
      wide ? 'max-w-full' : 'max-w-lg',
    ])}
  >
    {children}
  </main>
);
