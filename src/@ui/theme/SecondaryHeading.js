import PropTypes from 'prop-types';
import { forwardRef } from 'react';

export const SecondaryHeading = forwardRef(
  ({ level = 2, component, children }, ref) => {
    const Heading = component ?? `h${level}`;

    return (
      <Heading className="relative text-xl lg:text-3xl" ref={ref}>
        {children}
      </Heading>
    );
  },
);

SecondaryHeading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.node,
};
