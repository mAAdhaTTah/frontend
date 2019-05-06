import React from 'react';
import PropTypes from 'prop-types';

const ReadLink = ({ url, title, excerpt, readAt }) => (
  <li className="my-1 bg-accent-light p-3 rounded text-font-color-dark my-2">
    <a
      href={url}
      className="no-underline block text-secondary-color bg-accent-dark p-3 rounded mb-2"
    >
      {title || url}
    </a>
    <div className="bg-primary-color p-3 rounded mb-2">
      <p className="max-h-4 overflow-hidden">{excerpt}</p>
    </div>
    <p className="bg-accent-dark rounded text-secondary-color p-2">
      Read at {readAt}
    </p>
  </li>
);

ReadLink.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  readAt: PropTypes.string.isRequired,
};

const Day = ({ dayOf, links }) => (
  <div className="max-w-md mx-auto">
    <h2 className="font-header py-3 text-2xl px-3">Day of {dayOf}</h2>
    <ul className="font-body list-reset">
      {links.map(link => (
        <ReadLink key={link.id} {...link} />
      ))}
    </ul>
  </div>
);

Day.propTypes = {
  dayOf: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
};

export default Day;
