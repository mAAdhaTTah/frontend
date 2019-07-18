import { useMemo } from 'react';

const stripHTML = html =>
  new DOMParser().parseFromString(html, 'text/html').body.textContent ?? '';

export default string => useMemo(() => stripHTML(string), [string]);
