import React from 'react';
import { Story, Meta } from '@storybook/react';

import ErrorMessage from './ErrorMessage';

export default {
	title: 'Components/ErrorMessage',
	component: ErrorMessage,
} as Meta;

const Template: Story = (args) => <ErrorMessage {...args} />;

export const DefaultErrorMessage = Template.bind({});
DefaultErrorMessage.args = { error: Error('This is an error') };

export const EmptyErrorMessage = Template.bind({});
EmptyErrorMessage.args = { error: {} };

export const NoErrorMessage = Template.bind({});
NoErrorMessage.args = {};
