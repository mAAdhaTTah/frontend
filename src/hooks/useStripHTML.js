import { useMemo } from 'react';
import stripHTML from 'string-strip-html';

export const useStripHTML = string =>
  useMemo(() => stripHTML(string), [string]).result;
