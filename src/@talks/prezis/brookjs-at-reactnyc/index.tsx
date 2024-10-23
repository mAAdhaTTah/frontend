'use client';
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module 'spec... Remove this comment to see the full error message
import { Deck, Slide, Heading, Code, Text, List, ListItem } from 'spectacle';
import {
  AboutMe,
  ReactPlusCycleJs,
  LetsTalkAboutReact,
  DeclarativeViews,
  ThinkingInReact,
  ImmutableData,
  MapFilterReduce,
  UnidirectionalData,
  EverythingIsAStream,
  WhatIsAnObservable,
  StreamOfEvents,
  ArraysOfEvents,
  PureFunctionOfObservables,
  TheBigReveal,
  DeltaFunctions,
  ApplicationBootstrapping,
  CurrentStatus20170626,
  GetInvolved,
  ThankYou,
} from '../../slides';
import { DarkTheme } from '../../themes';

const Title = () => (
  <Slide transition={['slide']}>
    <Heading size={1}>
      Meet <Code>brookjs</Code>
    </Heading>
    <Text>A framework for building streaming web applications.</Text>
  </Slide>
);

const Agenda = () => (
  <Slide transition={['slide']}>
    <List>
      <ListItem>
        React/Redux: Declarative DOM & one-way data
        <List>
          <ListItem>Functional programming</ListItem>
        </List>
      </ListItem>
      <ListItem>
        Cycle.js: Everything is a stream
        <List>
          <ListItem>streams/observables</ListItem>
        </List>
      </ListItem>
      <ListItem>
        Meet <Code>brookjs</Code>
      </ListItem>
    </List>
  </Slide>
);

const Prezi = () => (
  <Deck transition={['slide']} transitionDuration={500} theme={DarkTheme}>
    {Title()}
    {AboutMe()}
    {ReactPlusCycleJs()}
    {Agenda()}
    {LetsTalkAboutReact()}
    {DeclarativeViews()}
    {ThinkingInReact()}
    {ImmutableData()}
    {MapFilterReduce()}
    {UnidirectionalData()}
    {EverythingIsAStream()}
    {WhatIsAnObservable()}
    {StreamOfEvents()}
    {ArraysOfEvents()}
    {PureFunctionOfObservables()}
    {TheBigReveal()}
    {DeltaFunctions()}
    {ApplicationBootstrapping()}
    {CurrentStatus20170626()}
    {GetInvolved()}
    {ThankYou()}
  </Deck>
);

export default Prezi;
