import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Phone } from '../../@types/Phone';
import Detail from './Detail';

const phone: Phone = {
	id: 0,
	name: 'iPhone 7',
	manufacturer: 'Apple',
	description:
		'iPhone 7 dramatically improves the most important aspects of the iPhone experience. It introduces advanced new camera systems. The best performance and battery life ever in an iPhone. Immersive stereo speakers. The brightest, most colorful iPhone display. Splash and water resistance*. And it looks every bit as powerful as it is. This is iPhone 7.',
	color: 'black',
	price: 769,
	imageFileName: 'http://localhost:3001/images/IPhone_7.png',
	screen: '4,7 inch IPS',
	processor: 'A10 Fusion',
	ram: 2,
};

export default {
	title: 'Components/Detail',
	component: Detail,
} as Meta;

const Template: Story = (args) => <Detail {...args} />;

export const DefaultDetail = Template.bind({});
DefaultDetail.args = {
	phone,
};

export const EmptyDetail = Template.bind({});
