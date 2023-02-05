import isChromatic from 'chromatic';
import Header from './Header';

const backgroundImage = {
  src: 'https://static.jamesdigioia.com/uploads/2020/11/header-1.jpg',
  alt: 'background image',
};

const avatarImage = {
  src: 'https://static.jamesdigioia.com/uploads/2015/02/new-avatar-sq.jpg',
  alt: 'avatar',
  height: 783,
  width: 783,
};

export default {
  title: 'Components/Header',
};

const Template = args => (
  <Header
    title="James DiGioia"
    description="my little web home"
    backgroundImage={backgroundImage}
    avatarImage={avatarImage}
    disableTyping={isChromatic()}
    {...args}
  />
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
