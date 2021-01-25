import React from 'react';
import { Story, Meta } from '@storybook/react';

import Loader from './Loader';

export default {
	title: 'Components/Loader',
	component: Loader,
} as Meta;

const Template: Story = () => <Loader />;

export const DefaultLoader = Template.bind({});
