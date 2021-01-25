import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders the Button component', () => {
	const label = 'This is the label button';
	let buttonPressed = false;

	render(
		<Button
			label={label}
			onClick={() => {
				buttonPressed = true;
			}}
		/>,
	);

	const theButton = screen.getByText(label);

	expect(theButton).toBeInTheDocument();

	fireEvent.click(theButton);
	expect(buttonPressed).toBeTruthy();
});
