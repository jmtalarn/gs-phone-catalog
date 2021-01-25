import React from 'react';
import { Story, Meta } from '@storybook/react';

import Content from './Content';

export default {
	title: 'Components/Content',
	component: Content,
} as Meta;

const Template: Story = (args) => <Content {...args} />;

export const DefaultContent = Template.bind({});
DefaultContent.args = {
	children: (
		<div>
			Aliqua fugiat cillum in excepteur ullamco aliqua. Sunt laboris deserunt veniam mollit velit est. Velit magna
			labore laboris et aliquip eiusmod tempor commodo dolor id reprehenderit aliquip laboris. Mollit minim ut
			aute qui incididunt ullamco est amet.
		</div>
	),
};
