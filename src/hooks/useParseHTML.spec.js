import { render } from '@testing-library/react';
import { useParseHTML } from './useParseHTML';

const ParseHTML = ({ html }) => {
  const result = useParseHTML(html);

  return <>{result}</>;
};

describe('useParseHTML', () => {
  it('should parse a p tag', () => {
    const { container } = render(<ParseHTML html="<p>I am a p tag!</p>" />);
    expect(container).toMatchSnapshot();
  });
});
