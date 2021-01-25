import React from 'react';
import { Story, Meta } from '@storybook/react';

import Header from './Header';

export default {
	title: 'Components/Header',
	component: Header,
} as Meta;

const Template: Story = (args) => <Header {...args} />;

export const DefaultHeader = Template.bind({});
DefaultHeader.args = {};
