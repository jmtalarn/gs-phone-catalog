import '../src/theme/index.css';
import React from 'react';
import { ApiProvider } from '../src/actions/api-context';
export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
	(Story) => (
		<ApiProvider>
			<Story />
		</ApiProvider>
	),
];
