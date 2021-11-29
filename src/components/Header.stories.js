import isChromatic from 'chromatic';
import Header from './Header';
import { avatarImage, backgroundImage } from './images';

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
