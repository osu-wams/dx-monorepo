import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ButtonLink } from 'src/ui/Button';
import { Color } from 'src/theme/theme-colors';

export default {
  title: 'Button/Button Link',
  component: ButtonLink,
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

const Template: Story<ComponentProps<typeof ButtonLink>> = args => <ButtonLink {...args}>Click me!</ButtonLink>;

export const Primary = Template.bind({});
Primary.args = {};
export const Styled = Template.bind({});
Styled.args = {
  btnSize: 'large',
  bg: Color['roguewave-400'],
  fg: Color.white,
};
