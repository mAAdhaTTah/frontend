import PropTypes from 'prop-types';
import { forwardRef } from 'react';

export const SecondaryHeading = forwardRef(
  // @ts-expect-error TS(2339) FIXME: Property 'level' does not exist on type '{}'.
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
  // @ts-expect-error TS(2322) FIXME: Type '{ level: PropTypes.Requireable<number>; chil... Remove this comment to see the full error message
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  component: PropTypes.element,
  children: PropTypes.node,
};
