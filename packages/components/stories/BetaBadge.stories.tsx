import React from 'react';
// Also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { BetaBadge, BetaBadgeProps } from '../src/ui/Badge';
import { dark } from '../src/theme/themes';

addDecorator(storyFn => <ThemeProvider theme={dark}>{storyFn()}</ThemeProvider>);

const meta: Meta = {
  title: 'Example/BetaBadge',
  component: BetaBadge,
};
export default meta;

const Template: Story<BetaBadgeProps> = args => <BetaBadge {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Beta',
};
