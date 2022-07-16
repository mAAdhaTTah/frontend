export const Ul = ({ children }) => {
  return <ul className="list-disc pl-4 mb-5">{children}</ul>;
};

export const Ol = ({ children }) => {
  return <ol className="list-decimal pl-4 mb-5">{children}</ol>;
};

export const Li = ({ id, children }) => {
  return (
    <li id={id} className="mb-1 font-ovo text-xl">
      {children}
    </li>
  );
};
