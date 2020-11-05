import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import Icon from 'src/ui/Icon';
import { faCoffee } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components/macro';
import { spacing } from 'src/theme';

const Container = styled.div`
  width: 50%;
  padding: ${spacing.default};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default {
  title: 'Icon',
  component: Icon,
  argTypes: {
    bg: { control: 'color' },
    color: { control: 'color' },
    icon: { table: { disable: true } },
  },
};

const Template: Story<ComponentProps<typeof Icon>> = args => (
  <Container>
    <Icon {...args} />
  </Container>
);

export const FontAwesome = Template.bind({});
FontAwesome.args = { icon: faCoffee, fontSize: '32px' };

export const FontAwesomeAndCounter = Template.bind({});
FontAwesomeAndCounter.args = { icon: faCoffee, fontSize: '32px', count: 4, top: true };

const MultiTemplate: Story<ComponentProps<typeof Icon>> = args => (
  <Container>
    <Icon {...args} />
    <Icon {...{ icon: faCoffee, fontSize: '32px', count: 4, top: false }} />
    <Icon {...{ icon: faCoffee, fontSize: '32px', count: 823, top: true }} />
    <Icon {...{ icon: faCoffee, fontSize: '32px', count: undefined, top: false }} />
  </Container>
);
export const Samples = MultiTemplate.bind({});
Samples.args = { icon: faCoffee, fontSize: '32px', count: 4, top: true };
