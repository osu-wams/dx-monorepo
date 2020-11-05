import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import LeadText from 'src/ui/LeadText';

export default {
  title: 'LeadText',
  component: LeadText,
};

const Template: Story<ComponentProps<typeof LeadText>> = args => <LeadText {...args}>Some description text.</LeadText>;

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = { secondary: true };
