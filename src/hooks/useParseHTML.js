import React, { useMemo } from 'react';
import parse, { domToReact } from 'html-react-parser';
import { Body } from '../components';

const options = {
  replace: function replace(node) {
    if (node.name === 'p') {
      return <Body>{domToReact(node.children)}</Body>;
    }
  },
};

export default string => useMemo(() => parse(string, options), [string]);
