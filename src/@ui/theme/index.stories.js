import { PrimaryHeading as PrimaryHeadingTypography } from './PrimaryHeading';
import { SecondaryHeading as SecondaryHeadingTypography } from './SecondaryHeading';
import { Icon as IconTheme } from './Icon';

export default {
  title: '@ui/theme',
};

export const PrimaryHeading = {
  render: () => (
    <>
      <PrimaryHeadingTypography>A Primary Heading</PrimaryHeadingTypography>
      <PrimaryHeadingTypography level={3}>
        A Level 3 Primary Heading
      </PrimaryHeadingTypography>
    </>
  ),
};

export const SecondaryHeading = {
  render: () => (
    <>
      <SecondaryHeadingTypography>A Primary Heading</SecondaryHeadingTypography>
      <SecondaryHeadingTypography level={4}>
        A Level 4 Primary Heading
      </SecondaryHeadingTypography>
    </>
  ),
};

export const Icon = {
  render: () => (
    <>
      <IconTheme icon="facebook" />
      <IconTheme icon="linkedin" />
      <IconTheme icon="github" />
    </>
  ),
};
