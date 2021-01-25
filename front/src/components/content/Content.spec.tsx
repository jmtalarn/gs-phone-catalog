import React from 'react';
import { render, screen } from '@testing-library/react';
import Content from './Content';

test('renders the Content component', () => {
	const { queryByTestId } = render(<Content />);

	expect(queryByTestId('main')).toBeInTheDocument();
});

test('renders the Content component with children', () => {
	const { queryByTestId } = render(
		<Content>
			<h1 data-testid="h1-children"></h1>
			<div data-testid="div-children">
				<p data-testid="p-children">
					<span data-testid="span-children">></span>
				</p>
			</div>
		</Content>,
	);

	expect(queryByTestId('main')).toBeInTheDocument();
	const h1 = queryByTestId('h1-children');
	const div = queryByTestId('div-children');
	const p = queryByTestId('p-children');
	const span = queryByTestId('span-children');


	expect(queryByTestId('main')).toContainElement(h1);
	expect(queryByTestId('main')).toContainElement(div);
	expect(queryByTestId('main')).toContainElement(p);
	expect(queryByTestId('main')).toContainElement(span);

});
