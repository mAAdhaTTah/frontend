'use client';
import { Deck, Slide, Heading, Text, UnorderedList, ListItem } from 'spectacle';
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
      Meet <code>brookjs</code>
    </Heading>
    <Text>A framework for building streaming web applications.</Text>
  </Slide>
);

const Agenda = () => (
  <Slide transition={['slide']}>
    <UnorderedList>
      <ListItem>
        React/Redux: Declarative DOM & one-way data
        <UnorderedList>
          <ListItem>Functional programming</ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        Cycle.js: Everything is a stream
        <UnorderedList>
          <ListItem>streams/observables</ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        Meet <code>brookjs</code>
      </ListItem>
    </UnorderedList>
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
