import React from 'react';
import { ApiProvider } from '../src/actions/api-context';
import { render } from '@testing-library/react';
import App from './App';

test('renders the whole App', () => {
	const { getByText, queryByTestId } = render(
		<ApiProvider>
			<App />
		</ApiProvider>,
	);
	const element = getByText(/Phone Catalog/i);
	expect(element).toBeInTheDocument();

	expect(queryByTestId('header')).toBeInTheDocument();
	expect(queryByTestId('main')).toBeInTheDocument();
	expect(queryByTestId('footer')).toBeInTheDocument();
});
