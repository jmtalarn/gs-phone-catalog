import React from 'react';
import { ApiProvider } from '../../actions/api-context';
import { render } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

test('renders the error message component', () => {
	const { getByTestId } = render(
		<ApiProvider>
			<ErrorMessage error={Error('TEST ERROR')} />
		</ApiProvider>,
	);

	expect(getByTestId('error-message')).toHaveTextContent('ERROR:');
});
