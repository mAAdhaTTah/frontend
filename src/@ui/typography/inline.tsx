import cc from 'classcat';
import NextLink from 'next/link';
import { FC, ReactNode } from 'react';

export const EM: FC<{ children: ReactNode }> = ({ children }) => {
  return <em>{children}</em>;
};

export const Strong: FC<{ children: ReactNode }> = ({ children }) => {
  return <strong>{children}</strong>;
};

export const Small: FC<{ children: ReactNode }> = ({ children }) => {
  return <small>{children}</small>;
};

export const Abbr: FC<{ children: ReactNode; title?: string }> = ({
  title,
  children,
}) => {
  return <abbr title={title}>{children}</abbr>;
};

export const Acronym: FC<{ children: ReactNode; title?: string }> = ({
  title,
  children,
}) => {
  // @ts-expect-error TS(2339) FIXME: Property 'acronym' does not exist on type 'JSX.Int... Remove this comment to see the full error message
  return <acronym title={title}>{children}</acronym>;
};

export const Del: FC<{ children: ReactNode }> = ({ children }) => {
  return <del>{children}</del>;
};

export const Ins: FC<{ children: ReactNode }> = ({ children }) => {
  return <ins>{children}</ins>;
};

export const Kbd: FC<{ children: ReactNode }> = ({ children }) => {
  return <kbd>{children}</kbd>;
};

export const Pre: FC<{ children: ReactNode }> = ({ children }) => {
  return <pre className="mb-5">{children}</pre>;
};

export const Code: FC<{ children: ReactNode }> = ({ children }) => {
  return <code className="whitespace-nowrap">{children}</code>;
};

export const Samp: FC<{ children: ReactNode }> = ({ children }) => {
  return <samp>{children}</samp>;
};

export const Var: FC<{ children: ReactNode }> = ({ children }) => {
  return <var>{children}</var>;
};

export const Q: FC<{ children: ReactNode }> = ({ children }) => {
  return <q>{children}</q>;
};

export const Sub: FC<{ children: ReactNode }> = ({ children }) => {
  return <sub>{children}</sub>;
};

export const Sup: FC<{ children: ReactNode; id: string }> = ({
  id,
  children,
}) => {
  return <sup id={id}>{children}</sup>;
};

const linkClass = cc(['no-underline', 'border-b-2', 'border-darkg']);

export const Link: FC<{
  children: ReactNode;
  href: string;
  title?: string;
}> = ({ children, href, title }) => {
  return (
    <NextLink href={href} className={linkClass} title={title}>
      {children}
    </NextLink>
  );
};
