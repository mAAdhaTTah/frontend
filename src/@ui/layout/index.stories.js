import isChromatic from 'chromatic';
import Image from 'next/image';
import { Header } from './Header';

const backgroundImage = (
  <Image
    {...{
      src: 'https://static.jamesdigioia.com/uploads/2020/11/header-1.jpg',
      alt: 'background image',
      width: 1341,
      height: 914,
    }}
  />
);

const avatarImage = (
  <Image
    {...{
      src: 'https://static.jamesdigioia.com/uploads/2015/02/new-avatar-sq.jpg',
      alt: 'avatar',
      height: 783,
      width: 783,
    }}
  />
);

export default {
  title: '@ui/layout',
};

const Template = args => (
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
FullScreenHeader.args = {
  fullScreen: true,
};
FullScreenHeader.parameters = {
  layout: 'fullscreen',
};

export const PartialScreenHeader = Template.bind({});
PartialScreenHeader.args = {
  fullScreen: false,
};
PartialScreenHeader.parameters = {
  layout: 'fullscreen',
};
