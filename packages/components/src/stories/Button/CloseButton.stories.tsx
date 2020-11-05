import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { CloseButton } from 'src/ui/Button';

export default {
  title: 'Button/Close Button',
  component: CloseButton,
};

const Template: Story<ComponentProps<typeof CloseButton>> = args => <CloseButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
