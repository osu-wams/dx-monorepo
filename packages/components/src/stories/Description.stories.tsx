import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import Description from 'src/ui/Description';

export default {
  title: 'Description',
  component: Description,
};

const Template: Story<ComponentProps<typeof Description>> = args => (
  <Description {...args}>Some description text.</Description>
);

export const Primary = Template.bind({});
Primary.args = {};
