import PropTypes from 'prop-types';

export const PrimaryHeading = ({ level = 1, children }) => {
  const Heading = `h${level}`;

  return (
    <Heading className="text-4xl md:text-5xl font-bold font-muli mb-3">
      {children}
    </Heading>
  );
};

PrimaryHeading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.node,
};
