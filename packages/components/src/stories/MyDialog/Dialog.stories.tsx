import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { MyDialog, MyDialogHeader, MyDialogContent, MyDialogFooter } from 'src/ui/MyDialog';

export default {
  title: 'My Dialog/Basic Dialog',
  component: MyDialog,
  argTypes: {
    padding: {
      control: {
        type: 'inline-radio',
        options: ['true', 'false'],
      },
    },
  },
};

const Template: Story<ComponentProps<typeof MyDialog>> = args => (
  <MyDialog {...args}>
    <MyDialogHeader>Header Row</MyDialogHeader>
    <MyDialogContent>Content Body</MyDialogContent>
    <MyDialogFooter>Footer Row</MyDialogFooter>
  </MyDialog>
);

export const Primary = Template.bind({});
Primary.args = {};
