import { Talk } from './Talk';
import { SlideLayout, SlideH1, SlideH2, SlideP, SlideA } from '@ui/talks';

export default {
  title: '@ui/components/Talk',
  component: Talk,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

const slides = [
  <SlideLayout key={0}>
    <SlideH1>Slide One</SlideH1>
    <SlideP>First slide content.</SlideP>
  </SlideLayout>,
  <SlideLayout key={1}>
    <SlideH2>Slide Two</SlideH2>
    <SlideP>
      Middle slide with a <SlideA href="#">link example</SlideA>.
    </SlideP>
  </SlideLayout>,
  <SlideLayout key={2}>
    <SlideH1>Slide Three</SlideH1>
    <SlideP>Last slide content.</SlideP>
  </SlideLayout>,
];

export const FirstSlide = {
  args: { slides },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { query: { slide: '0' } },
    },
  },
};

export const MiddleSlide = {
  args: { slides },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { query: { slide: '1' } },
    },
  },
};

export const LastSlide = {
  args: { slides },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { query: { slide: '2' } },
    },
  },
};
