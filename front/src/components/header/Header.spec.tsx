import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders the header component', () => {
	render(<Header />);

	expect(screen.getByRole('heading')).toHaveTextContent('Phone catalog');
});
