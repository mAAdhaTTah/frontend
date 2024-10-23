import cc from 'classcat';
import NextLink from 'next/link';

export const EM = ({ children }: any) => {
  return <em>{children}</em>;
};

export const Strong = ({ children }: any) => {
  return <strong>{children}</strong>;
};

export const Small = ({ children }: any) => {
  return <small>{children}</small>;
};

export const Abbr = ({ title, children }: any) => {
  return <abbr title={title}>{children}</abbr>;
};

export const Acronym = ({ title, children }: any) => {
  // @ts-expect-error TS(2339) FIXME: Property 'acronym' does not exist on type 'JSX.Int... Remove this comment to see the full error message
  return <acronym title={title}>{children}</acronym>;
};

export const Del = ({ children }: any) => {
  return <del>{children}</del>;
};

export const Ins = ({ children }: any) => {
  return <ins>{children}</ins>;
};

export const Kbd = ({ children }: any) => {
  return <kbd>{children}</kbd>;
};

export const Pre = ({ children }: any) => {
  return <pre className="mb-5">{children}</pre>;
};

export const Code = ({ children }: any) => {
  return <code className="whitespace-nowrap">{children}</code>;
};

export const Samp = ({ children }: any) => {
  return <samp>{children}</samp>;
};

export const Var = ({ children }: any) => {
  return <var>{children}</var>;
};

export const Q = ({ children }: any) => {
  return <q>{children}</q>;
};

export const Sub = ({ children }: any) => {
  return <sub>{children}</sub>;
};

export const Sup = ({ id, children }: any) => {
  return <sup id={id}>{children}</sup>;
};

const linkClass = cc(['no-underline', 'border-b-2', 'border-darkg']);

export const Link = ({ children, href, title }: any) => {
  return (
    <NextLink href={href} className={linkClass} title={title}>
      {children}
    </NextLink>
  );
};
