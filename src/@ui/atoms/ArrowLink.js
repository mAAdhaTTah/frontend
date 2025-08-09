import cc from 'classcat';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'next-view-transitions';

const linkClass = cc([
  'font-ovo',
  'flex',
  'flex-row',
  'items-center',
  'float-right',
  'no-underline',
  'bg-darkg',
  'p-2',
  'text-primary',
  'rounded',
  'mt-3',
  'text-xl',
  'leading-normal',
]);
const iconClass = cc(['ml-2']);

export const ArrowLink = ({ slug, children }) => {
  return (
    <Link href={`${slug}/`} className={linkClass}>
      {children}
      <FaLongArrowAltRight className={iconClass} />
    </Link>
  );
};
