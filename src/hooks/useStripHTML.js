import { useMemo } from 'react';
import stripHTML from 'string-strip-html';

export default string => useMemo(() => stripHTML(string), [string]);
