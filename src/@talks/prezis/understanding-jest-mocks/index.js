import {
  Deck,
  Slide,
  Heading,
  Code,
  Text,
  List,
  ListItem,
  Appear,
  CodePane,
  Link,
  MarkdownSlides,
} from 'spectacle';
import { AboutMe, ThankYou } from '../../slides';
import { DarkTheme } from '../../themes';
import mdSlides from './slides.md';

const Title = () => (
  <Slide transition={['slide']}>
    <Heading size={1}>Understanding Jest Mocks</Heading>
    <Text>What to expect when you're <Code>expect</Code>ing.</Text>
  </Slide>
);

const Agenda = () => (
  <Slide transition={['slide']}>
    <Heading size={2}>Agenda</Heading>
    <List>
      <ListItem>Overview of terms</ListItem>
      <ListItem>Jest's mocking capabilities</ListItem>
      <ListItem>
        Mocking functions with <Code>jest.fn</Code>
      </ListItem>
      <ListItem>
        Mocking timers with <Code>jest.useFakeTimers</Code>
      </ListItem>
      <ListItem>
        Mocking modules with <Code>jest.mock</Code>
      </ListItem>
    </List>
  </Slide>
);

const GlossaryOfTerms = () => (
  <Slide transition={['slide']}>
    <Heading size={2}>Glossary of Terms</Heading>
    <List>
      <ListItem textSize={30}>
        <strong>Test Doubles</strong> - General term for "not real" objects used
        in tests
      </ListItem>
      <ListItem textSize={30}>
        <strong>Dummy</strong> - Object that is passed around but never actually
        used
      </ListItem>
      <ListItem textSize={30}>
        <strong>Fake</strong> - Object with a working implementation that takes
        a non-production shortcut (think in-memory databases)
      </ListItem>
      <ListItem textSize={30}>
        <strong>Stubs</strong> - Preprogrammed object with canned responses
      </ListItem>
      <ListItem textSize={30}>
        <strong>Mocks</strong> - Preprogrammed object with expectations for what
        they're going to receive
      </ListItem>
      <ListItem textSize={30}>
        <strong>Spies</strong> - Wrappers around existing objects that intercept
        calls to their methods and can provide mock implementations
      </ListItem>
    </List>
  </Slide>
);

const WhyDoTheseMatter = () => (
  <Slide transition={['slide']}>
    <Heading size={2}>Why do these matter?</Heading>
    <Appear>
      <Text>They don't</Text>
    </Appear>
    <Appear>
      <Text>Stubs & mocks are basically the same thing.</Text>
    </Appear>
    <Appear>
      <Text>
        In other languages or tools (like Sinon), the difference might matter.
      </Text>
    </Appear>
  </Slide>
);

const JestsMockingCapabilities = () => (
  <Slide transition={['slide']}>
    <Heading size={2}>Jest's Mocking Capabilities</Heading>
    <List>
      <ListItem>
        <Code>jest.fn</Code> - mock functions, the core of Jest's capabilities
      </ListItem>
      <ListItem>
        <Code>jest.useMockTimers</Code> - mock timers like{' '}
        <Code>setTimeout</Code>
      </ListItem>
      <ListItem>
        <Code>jest.mock</Code> - mock modules
      </ListItem>
    </List>
  </Slide>
);

const JestFnOverview = () => (
  <Slide transition={['slide']}>
    <Heading size={2}>
      <Code>jest.fn</Code>
    </Heading>
    <CodePane
      lang="js"
      source={`
// provide an implementation when creating
const mockFn = jest.fn(x => x + 1);
// change the implementation
mockFn.mockImplementation(x => x + 2);
// call the mock function
expect(mockFn(1)).toBe(3);
// assert calls
expect(mockFn).toHaveBeenCalledWith(1);
`.trim()}
    />
  </Slide>
);

const JestFnExample = () => (
  <Slide transition={['slide']}>
    <Heading size={2}>
      <Link
        target="_blank"
        href="https://codesandbox.io/p/sandbox/jest-mock-sandbox-mw7u82?file=/src/Button.spec.js"
      >
        Example
      </Link>
    </Heading>
  </Slide>
);

const Rest = () => MarkdownSlides(mdSlides);

const Prezi = () => (
  <Deck transition={['slide']} transitionDuration={500} theme={DarkTheme}>
    {Title()}
    {AboutMe()}
    {Agenda()}
    {GlossaryOfTerms()}
    {WhyDoTheseMatter()}
    {JestsMockingCapabilities()}
    {JestFnOverview()}
    {JestFnExample()}
    {Rest()}
    {ThankYou()}
  </Deck>
);

export default Prezi;
