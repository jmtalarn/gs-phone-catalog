import React from 'react';
import { ApiProvider } from '../../actions/api-context';
import notFoundImg from './notfound.jpg';
import { render } from '@testing-library/react';
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

test('renders the Detail component', () => {
	const { queryByTestId } = render(
		<ApiProvider>
			<Detail phone={phone} />
		</ApiProvider>,
	);

	expect(queryByTestId('item-image')).toBeInTheDocument();
	expect(queryByTestId('item-image')).toHaveStyle(
		`background-image: url(${phone.imageFileName}), url(${notFoundImg})`,
	);
	expect(queryByTestId('item-title')).toBeInTheDocument();
	expect(queryByTestId('item-title')).toHaveTextContent(phone.name);
	expect(queryByTestId('item-description')).toBeInTheDocument();
	expect(queryByTestId('item-description')).toHaveTextContent(phone.description);
	expect(queryByTestId('item-price')).toBeInTheDocument();
	expect(queryByTestId('item-price')).toHaveTextContent(`${phone.price} €`);
});
