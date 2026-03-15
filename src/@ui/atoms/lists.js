/** @type {import('react').FC<{ children: import('react').ReactNode }>} */
export const Ul = ({ children }) => {
  return <ul className="list-disc pl-8">{children}</ul>;
};

/** @type {import('react').FC<{ children: import('react').ReactNode }>} */
export const Ol = ({ children }) => {
  return <ol className="list-decimal pl-8">{children}</ol>;
};

/** @type {import('react').FC<{ id?: string; className?: string; children: import('react').ReactNode }>} */
export const Li = ({ id, className, children }) => {
  return (
    <li
      id={id}
      className={`mb-1 font-ovo text-xl${className ? ` ${className}` : ''}`}
    >
      {children}
    </li>
  );
};
