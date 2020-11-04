import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import Icon from '../ui/Icon';
import { faBomb } from '@fortawesome/pro-light-svg-icons';

export default {
  title: 'Icon',
  component: Icon,
  argTypes: {
    bg: { control: 'color' },
    color: { control: 'color' },
  },
};

const Template: Story<ComponentProps<typeof Icon>> = args => <Icon {...args} />;

export const Counter = Template.bind({});
Counter.args = { top: true, count: 4 };

export const FontAwesome = Template.bind({});
FontAwesome.args = { icon: faBomb, fontSize: '32px' };

export const FontAwesomeAndCounter = Template.bind({});
FontAwesomeAndCounter.args = { icon: faBomb, fontSize: '32px', count: 4, top: true };
