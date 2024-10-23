import { FaQuoteLeft } from 'react-icons/fa';

export const Blockquote = ({ children }: any) => {
  return (
    <>
      <FaQuoteLeft className="float-left mt-1" />
      <blockquote className="ml-10">{children}</blockquote>
    </>
  );
};
