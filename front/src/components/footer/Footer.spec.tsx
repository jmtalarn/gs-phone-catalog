import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

test('renders the footer component', () => {
	const { queryByTestId } = render(<Footer />);

	expect(queryByTestId('footer')).toBeInTheDocument();
});
