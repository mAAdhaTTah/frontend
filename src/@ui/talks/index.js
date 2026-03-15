import { Li, Blockquote } from '@ui/atoms';

/** @type {import('react').FC<{ children: import('react').ReactNode }>} */
export const SlideLayout = ({ children }) => (
  <div className="slide-content">{children}</div>
);

/** @type {import('react').FC<{ children: import('react').ReactNode }>} */
export const SlideP = ({ children }) => (
  <p className="font-montserrat text-xl leading-normal pb-3 text-white">
    {children}
  </p>
);

/** @type {import('react').FC<{ href?: string; children: import('react').ReactNode }>} */
export const SlideA = ({ href, children }) => (
  <a href={href} className="text-lightg no-underline border-b-2 border-lightg">
    {children}
  </a>
);

/** @type {import('react').FC<{ children: import('react').ReactNode }>} */
export const SlideH1 = ({ children }) => (
  <h1 className="text-4xl text-lightg font-montserrat mb-5">{children}</h1>
);

/** @type {import('react').FC<{ children: import('react').ReactNode }>} */
export const SlideH2 = ({ children }) => (
  <h2 className="mb-5 font-montserrat text-3xl text-lightg">{children}</h2>
);

/** @type {import('react').FC<{ children: import('react').ReactNode }>} */
export const SlideH3 = ({ children }) => (
  <h3 className="mb-5 font-montserrat text-2xl text-lightg">{children}</h3>
);

/** @type {import('react').FC<{ children: import('react').ReactNode }>} */
export const SlideH4 = ({ children }) => (
  <h4 className="mb-3 font-montserrat inline-block border-b-2 text-xl text-lightg">
    {children}
  </h4>
);

/** @type {import('react').FC<{ id?: string; children: import('react').ReactNode }>} */
export const SlideLi = ({ id, children }) => (
  <Li id={id} className="font-montserrat text-white">
    {children}
  </Li>
);

/** @type {import('react').FC<{ children: import('react').ReactNode }>} */
export const SlideLic = ({ children }) => (
  <p className="font-montserrat text-xl leading-normal text-white">
    {children}
  </p>
);

/** @type {import('react').FC<{ children: import('react').ReactNode }>} */
export const SlideBlockquote = ({ children }) => (
  <Blockquote iconClassName="text-white">{children}</Blockquote>
);
