import PropTypes from 'prop-types';
import { forwardRef } from 'react';

export const PrimaryHeading = forwardRef(
  ({ component, level = 1, children }, ref) => {
    const Heading = component ?? `h${level}`;

    return (
      <Heading
        className="text-3xl lg:text-4xl font-bold font-muli mb-3"
        ref={ref}
      >
        {children}
      </Heading>
    );
  },
);

PrimaryHeading.propTypes = {
  component: PropTypes.string,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.node,
};
