import { Article } from '@ui/box';
import PropTypes from 'prop-types';

const ReadLink = ({ url, title, readAt }) => (
  <li className="my-1 bg-lightg p-3 rounded text-black my-2">
    <p className="bg-darkg rounded text-secondary p-3 font-ovo">
      <a href={url} className="block mb-2 font-muli text-lg">
        {title || url}
      </a>
      <time>Read at {readAt}</time>
    </p>
  </li>
);

ReadLink.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  readAt: PropTypes.string.isRequired,
};

const Day = ({ day, links }) => (
  <Article>
    <h2 className="font-muli py-3 text-2xl px-3">Day of {day}</h2>
    <ul className="font-ovo">
      {links.map(link => (
        <ReadLink key={link.id} {...link} />
      ))}
    </ul>
  </Article>
);

Day.propTypes = {
  day: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
};

export default Day;
