import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Button } from 'src/ui/Button';
import { Color } from 'src/theme/theme-colors';

export default {
  title: 'Button/Button',
  component: Button,
  argTypes: {
    bg: { control: 'color' },
    fg: { control: 'color' },
    btnSize: {
      control: {
        type: 'inline-radio',
        options: ['normal', 'small', 'large'],
      },
    },
  },
};

const Template: Story<ComponentProps<typeof Button>> = args => <Button {...args}>Click me!</Button>;

export const Primary = Template.bind({});
Primary.args = {};
export const Styled = Template.bind({});
Styled.args = {
  btnSize: 'large',
  bg: Color['roguewave-400'],
  fg: Color.white,
};
