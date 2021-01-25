import React from 'react';

export interface ButtonProps {
	/**
	 * Is this the principal call to action on the page?
	 */
	primary?: boolean;

	/**
	 * How large should the button be?
	 */
	size?: 'small' | 'medium' | 'large';
	/**
	 * Button contents
	 */
	label: string;
	/**
	 * Optional click handler
	 */
	onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
	label,
	primary = false,
	size = 'medium',
	style,
	...props
}: ButtonProps) => {
	const color = primary ? 'var(--primaryColor)' : 'var(--secondaryColor)';
	const fontSizePropToValue = (size: string): string => {
		switch (size) {
			case 'small':
				return '.6rem';
			case 'large':
				return '2.5rem';
			default:
				return '1rem';
		}
	};

	const buttonStyle = {
		display: 'inline-block',
		cursor: 'pointer',
		color,
		fontSize: fontSizePropToValue(size),
		background: 'none',
		margin: '1rem',
		padding: '0.25em 1em',
		border: `2px solid ${color}`,
		borderRadius: '3px',
		...style,
	};

	return (
		<button style={buttonStyle} type="button" {...props}>
			{label}
		</button>
	);
};
