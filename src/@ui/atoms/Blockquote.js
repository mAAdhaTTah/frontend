import { FaQuoteLeft } from 'react-icons/fa';

/** @type {import('react').FC<{ children: import('react').ReactNode; iconClassName?: string }>} */
export const Blockquote = ({ children, iconClassName }) => {
  return (
    <div>
      <FaQuoteLeft
        className={`float-left mt-1 ${iconClassName ? ` ${iconClassName}` : ''}`}
      />
      <blockquote className="ml-10">{children}</blockquote>
    </div>
  );
};
