import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import Icon from 'src/ui/Icon';
import { faCoffee } from '@fortawesome/pro-light-svg-icons';

export default {
  title: 'Icon',
  component: Icon,
  argTypes: {
    bg: { control: 'color' },
    color: { control: 'color' },
    icon: { table: { disable: true } },
  },
};

const Template: Story<ComponentProps<typeof Icon>> = args => <Icon {...args} />;

export const FontAwesome = Template.bind({});
FontAwesome.args = { icon: faCoffee, fontSize: '32px' };

export const FontAwesomeAndCounter = Template.bind({});
FontAwesomeAndCounter.args = { icon: faCoffee, fontSize: '32px', count: 4, top: true };

const MultiTemplate: Story<ComponentProps<typeof Icon>> = args => (
  <>
    <Icon {...args} />
    <Icon {...{ icon: faCoffee, fontSize: '32px', count: 4, top: false }} />
    <Icon {...{ icon: faCoffee, fontSize: '32px', count: 823, top: true }} />
    <Icon {...{ icon: faCoffee, fontSize: '32px', count: undefined, top: false }} />
  </>
);
export const Samples = MultiTemplate.bind({});
Samples.args = { icon: faCoffee, fontSize: '32px', count: 4, top: true };
