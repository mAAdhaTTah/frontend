import isChromatic from 'chromatic';
import { Header } from './Header';

const backgroundImage = {
  src: 'https://static.jamesdigioia.com/uploads/2020/11/header-1.jpg',
  alt: 'background image',
  width: 1341,
  height: 914,
};

const avatarImage = {
  src: 'https://static.jamesdigioia.com/uploads/2015/02/new-avatar-sq.jpg',
  alt: 'avatar',
  height: 783,
  width: 783,
};

export default {
  title: '@ui/layout',
};

const Template = (args: any) => (
  <div className={!args.fullScreen ? 'w-88' : ''}>
    <Header
      title="James DiGioia"
      description="my little web home"
      backgroundImage={backgroundImage}
      avatarImage={avatarImage}
      disableTyping={isChromatic()}
      links={[
        { text: 'Home', to: '/' },
        { text: 'Reading', to: '/reading/' },
        { text: 'Writing', to: '/writing/' },
        { text: 'Code', to: '/gistpens/' },
        { text: 'Talks', to: '/talks/' },
        { text: 'Resume', to: '/resume/' },
      ]}
      {...args}
    />
  </div>
);

export const FullScreenHeader = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
FullScreenHeader.args = {
  fullScreen: true,
};
// @ts-expect-error TS(2339) FIXME: Property 'parameters' does not exist on type '(arg... Remove this comment to see the full error message
FullScreenHeader.parameters = {
  layout: 'fullscreen',
};

export const PartialScreenHeader = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
PartialScreenHeader.args = {
  fullScreen: false,
};
// @ts-expect-error TS(2339) FIXME: Property 'parameters' does not exist on type '(arg... Remove this comment to see the full error message
PartialScreenHeader.parameters = {
  layout: 'fullscreen',
};
