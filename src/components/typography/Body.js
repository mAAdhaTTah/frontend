import React from 'react';
import cc from 'classcat';

const bodyClass = cc(['font-body', 'text-xl', 'leading-normal', 'pb-3']);

const Body = ({ component: C = 'p', className, children }) => (
  <C className={cc([bodyClass, className])}>{children}</C>
);

export default Body;
