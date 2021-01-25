import React from 'react';
import { ApiProvider } from '../../actions/api-context';
import { render, fireEvent, waitFor } from '@testing-library/react';
import notFoundImg from './notfound.jpg';
import GridItem from './GridItem';

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

test('renders the GridItem component', () => {
	const { queryByTestId } = render(
		<ApiProvider>
			<GridItem phone={phone} />
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
test('renders the GridItem component showing Detail', async () => {
	const { queryAllByTestId, queryByTitle, queryByTestId } = render(
		<ApiProvider>
			<GridItem phone={phone} showDetail />
		</ApiProvider>,
	);

	const buttonClose = queryByTitle('Click to close');
	expect(buttonClose).toBeInTheDocument();

	expect(queryAllByTestId('item-image')).toHaveLength(2);
	queryAllByTestId('item-image').forEach((i) =>
		expect(i).toHaveStyle(`background-image: url(${phone.imageFileName}), url(${notFoundImg})`),
	);
	expect(queryAllByTestId('item-title')).toHaveLength(2);
	queryAllByTestId('item-title').forEach((i) => expect(i).toHaveTextContent(phone.name));
	expect(queryAllByTestId('item-description')).toHaveLength(2);
	queryAllByTestId('item-description').forEach((i) => expect(i).toHaveTextContent(phone.description));
	expect(queryAllByTestId('item-price')).toHaveLength(2);
	queryAllByTestId('item-price').forEach((i) => expect(i).toHaveTextContent(`${phone.price} €`));

	fireEvent.click(buttonClose);
	await waitFor(() => {
		expect(queryAllByTestId('item-image')).toHaveLength(1);
	});
	expect(queryByTestId('item-image')).toBeInTheDocument();
	expect(queryByTestId('item-title')).toBeInTheDocument();
	expect(queryByTestId('item-title')).not.toHaveTextContent();
	expect(queryByTestId('item-description')).toBeInTheDocument();
	expect(queryByTestId('item-description')).not.toHaveTextContent();
	expect(queryByTestId('item-price')).toBeInTheDocument();
	expect(queryByTestId('item-price')).not.toHaveTextContent();
});
test('renders nothing without data', () => {
	const { queryByTestId } = render(
		<ApiProvider>
			<GridItem />
		</ApiProvider>,
	);

	expect(queryByTestId('item-image')).toBeInTheDocument();
	expect(queryByTestId('item-title')).toBeInTheDocument();
	expect(queryByTestId('item-title')).not.toHaveTextContent();
	expect(queryByTestId('item-description')).toBeInTheDocument();
	expect(queryByTestId('item-description')).not.toHaveTextContent();
	expect(queryByTestId('item-price')).toBeInTheDocument();
	expect(queryByTestId('item-price')).not.toHaveTextContent();
});
