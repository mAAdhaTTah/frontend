import React from 'react';
import cc from 'classcat';

const bodyClass = cc(['font-body', 'text-xl', 'leading-normal']);

const Body = ({ component: C = 'p', className, children }) => (
  <C className={bodyClass}>{children}</C>
);

export default Body;
