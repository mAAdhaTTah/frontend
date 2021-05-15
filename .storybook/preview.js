import { withNextRouter } from 'storybook-addon-next-router';
import { addDecorator } from '@storybook/react';
import * as NextImage from 'next/image';
import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <OriginalNextImage {...props} loading="eager" unoptimized />,
});

addDecorator(withNextRouter());
