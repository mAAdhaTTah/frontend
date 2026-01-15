import { Link } from 'next-view-transitions';
import cc from 'classcat';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Main } from '@ui/box';

const TalkCard = ({ title, description, slug }) => (
  <li
    className={cc([
      'rounded',
      'overflow-hidden',
      'text-tertiary',
      'bg-darkg',
      'hover:shadow-lg',
      'relative',
      'h-full',
      'flex',
      'flex-col',
      'px-6',
      'py-4',
    ])}
  >
    <h3 className="font-muli text-2xl mb-3">{title}</h3>
    <p className="font-ovo grow text-secondary text-base mb-3">{description}</p>
    <Link
      className="font-ovo flex flex-row items-center before:block before:absolute before:inset-x-0 before:inset-y-0"
      href={`/${slug}/`}
    >
      View Talk
      <FaLongArrowAltRight className="ml-3" />
    </Link>
  </li>
);

export const TalksArchive = async ({ talks }) => {
  return (
    <Main>
      <ul className="grid grid-cols-2	gap-4">
        {talks.map(talk => (
          <TalkCard key={talk.title} {...talk} />
        ))}
      </ul>
    </Main>
  );
};
