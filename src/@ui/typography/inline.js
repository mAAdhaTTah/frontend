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

export const Code = ({ children }) => {
  return <code>{children}</code>;
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

export const Sup = ({ children }) => {
  return <sup>{children}</sup>;
};
