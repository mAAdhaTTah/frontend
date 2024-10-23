import PropTypes from 'prop-types';
import { forwardRef } from 'react';

export const PrimaryHeading = forwardRef(
  // @ts-expect-error TS(2339) FIXME: Property 'component' does not exist on type '{}'.
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
  // @ts-expect-error TS(2322) FIXME: Type '{ component: PropTypes.Requireable<string>; ... Remove this comment to see the full error message
  component: PropTypes.string,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.node,
};
