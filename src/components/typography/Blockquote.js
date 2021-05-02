import { FaQuoteLeft } from 'react-icons/fa';

const Blockquote = ({ children }) => {
  return (
    <>
      <FaQuoteLeft className="float-left mt-1" />
      <blockquote className="ml-10">{children}</blockquote>
    </>
  );
};

export default Blockquote;
