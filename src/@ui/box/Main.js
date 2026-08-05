import cc from 'classcat';

// The margin-note rules in `src/index.css` select on `margin-notes` and do
// arithmetic off this column's width and padding — changing either means
// changing the numbers there.
export const Main = ({ children, wide = false }) => (
  <main
    className={cc([
      'print:pt-0',
      'print:mx-0',
      'print:px-0',
      'print:max-w-full',
      'p-5',
      wide ? 'max-w-full' : ['max-w-lg', 'margin-notes'],
    ])}
  >
    {children}
  </main>
);
