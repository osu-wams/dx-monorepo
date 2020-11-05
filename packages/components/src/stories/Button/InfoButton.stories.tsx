import React, { ComponentProps } from 'react';
import { atom } from 'recoil';
import { Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { InfoButton } from 'src/ui/Button';
import { InfoButtons } from '@osu-wams/hooks';

export default {
  title: 'Button/Info Button',
  component: InfoButton,
  argTypes: {
    state: { table: { disable: true } },
    infoButtonId: { table: { disable: true } },
    gaEvent: { table: { disable: true } },
  },
};

const Template: Story<ComponentProps<typeof InfoButton>> = args => <InfoButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  infoButtonId: 'page-id',
  state: atom<InfoButtons.InfoButtonState[]>({
    key: 'infoButtonState',
    default: [{ id: 'page-id', title: 'Example Page', content: 'Here is some help text.' }],
  }),
  gaEvent: action('google-analytics-event'),
};
