import React, { useRef, useContext, useEffect } from 'react';

import ApiContext from '../../actions/api-context';

interface ErrorMessageProps {
	error?: Error;
}
const ErrorMessage = ({ error: errorProperty }: ErrorMessageProps) => {
	const ref = useRef(null);
	const { error: errorContext, dismissError } = useContext(ApiContext);

	const error = errorProperty || errorContext;

	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => {
				ref.current.style.top = '4rem';
			});
			return () => {
				clearTimeout(timer);
			};
		}
	});

	return (
		error && (
			<div
				data-testid="error-message"
				style={{
					border: '1px solid var(--errorColor)',
					color: 'var(--errorColor)',
					backgroundColor: 'white',
					position: 'fixed',
					top: '-1000px',
					transition: 'top 500ms ease-in 500ms',
					width: '30rem',
					padding: '1rem',
					right: '4rem',
					borderRadius: '4px',
					margin: '0 auto',
					zIndex: 5,
				}}
				ref={ref}
			>
				<h2>ERROR: {(error && error?.name) || 'Ooops'}</h2>
				<p>{(error && error?.message) || 'Something weird happened'}</p>
				<div
					style={{
						opacity: '.5',
						backgroundColor: 'var(--errorColor)',
						position: 'absolute',
						top: '0',
						left: '0',
						height: '100%',
						width: '100%',
						borderRadius: '4px',
					}}
				></div>
				<button
					title="Click to dismiss"
					style={{
						position: 'absolute',
						right: '1rem',
						top: '1rem',
						fontSize: '1rem',
						background: 'none',
						border: 'none',
						cursor: 'pointer',
					}}
					onClick={() => {
						dismissError();
					}}
				>
					<span role="img" aria-label="The times icon to close the detail of the phone">
						✖️
					</span>
				</button>
			</div>
		)
	);
};

export default ErrorMessage;
