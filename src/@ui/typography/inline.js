import cc from 'classcat';
import NextLink from 'next/link';

export const EM = ({ children }) => {
  return <em>{children}</em>;
};

export const Strong = ({ children }) => {
  return <strong>{children}</strong>;
};

export const Small = ({ children }) => {
  return <small>{children}</small>;
};

export const Abbr = ({ title, children }) => {
  return <abbr title={title}>{children}</abbr>;
};

export const Acronym = ({ title, children }) => {
  return <acronym title={title}>{children}</acronym>;
};

export const Del = ({ children }) => {
  return <del>{children}</del>;
};

export const Ins = ({ children }) => {
  return <ins>{children}</ins>;
};

export const Kbd = ({ children }) => {
  return <kbd>{children}</kbd>;
};

export const Pre = ({ children }) => {
  return <pre className="mb-5">{children}</pre>;
};

export const Code = ({ children }) => {
  return <code className="whitespace-nowrap">{children}</code>;
};

export const Samp = ({ children }) => {
  return <samp>{children}</samp>;
};

export const Var = ({ children }) => {
  return <var>{children}</var>;
};

export const Q = ({ children }) => {
  return <q>{children}</q>;
};

export const Sub = ({ children }) => {
  return <sub>{children}</sub>;
};

export const Sup = ({ id, children }) => {
  return <sup id={id}>{children}</sup>;
};

const linkClass = cc(['no-underline', 'border-b-2', 'border-darkg']);

export const Link = ({ children, href, title }) => {
  return (
    <NextLink href={href} className={linkClass} title={title}>
      {children}
    </NextLink>
  );
};
