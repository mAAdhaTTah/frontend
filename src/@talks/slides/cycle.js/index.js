import { Slide, Markdown, CodePane, Text } from 'spectacle';
import mdEverythingIsAStream from './everything-is-a-stream.md';

export const EverythingIsAStream = () => (
  <Slide transition={['slide']}>
    <Markdown>{mdEverythingIsAStream}</Markdown>
  </Slide>
);

export const PureFunctionOfObservables = () => [
  <Slide>
    <Text>Cycle.js is a pure function</Text>
    <CodePane
      lang={'js'}
      source={`function main(sources) {
  const input$ = sources.DOM.select('.field').events('input')
  const name$ = input$.map(ev => ev.target.value).startWith('')
  const vdom$ = name$.map(name => div([
    label('Name:'),
    input('.field', {attrs: {type: 'text'}}),
    hr(),
    h1('Hello ' + name),
  ]))

  return { DOM: vdom$ }
}`}
    />
  </Slide>,
  <Slide transition={['slide']}>
    <Text>
      Observables are passed to <code>main</code>
    </Text>
    <Text>
      Observables are returned from <code>main</code>
    </Text>
    <Text>Observables wrap side effects</Text>
    <Text>
      <em>Observables all the way down</em>
    </Text>
  </Slide>,
];
